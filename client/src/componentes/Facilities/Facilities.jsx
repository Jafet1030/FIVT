import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UseDetailedContext from "../../context/UseDetailedContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Tiene que al menos haber 1 habitacion" : null),
      bathrooms: (value) =>
        value < 1 ? "Tiene que al menos haber 1 baño" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UseDetailedContext);
  const { refetch: refetchProperties } = useProperties();

  const {mutate, isLoading} = useMutation({
    mutationFn: ()=> createResidency({
        ...propertyDetails, facilities: {bedrooms, parkings , bathrooms},
    }, token),
    onError: ({ response }) => toast.error(response.data.message, {position: "bottom-right"}),
    onSettled: ()=> {
      toast.success("Agregado exitosamente", {position: "bottom-right"});
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      })
      setOpened(false)
      setActiveStep(0)
      refetchProperties()
    }

  })

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="Numero de habitaciones"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="Numero de estacionamientos"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="Numero de baños"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Atrás
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Agregar propiedad"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;