import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";


const Sales = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const form = useForm({
    initialValues: {
      seller: propertyDetails.seller,
      propertyId: propertyDetails.propertyId,
      commission: propertyDetails.commission,
    },
    validate: {
      seller: (value) => validateString(value),
      propertyId: (value) => validateString(value),
      commission: (value) =>
          value < 1000 ? "Debe de ser mas de $1,000 pesos" : null,
    },
  });

  const {seller, propertyId, commission} = form.values
 // Obtén el ID de la URL



  const handleSubmit = ()=> {
    const {hasErrors} = form.validate()
    if(!hasErrors) {
     setPropertyDetails((prev)=> ({...prev, seller, propertyId, commission}))
     nextStep()
    }
   }
  return (
    <Box maw="50%" mx="auto" my="md">
      <form  onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextInput
          placeholder="Nombre del vendedor"
          label="Vendedor"
          withAsterisk
          {...form.getInputProps("seller")}
        />
        <TextInput
          placeholder="Propiedad a vender"
          label="Propiedad a vender"
          withAsterisk
          value={propertyId} // Usa el ID de la propiedad aquí
          readOnly // Haz que el campo sea de solo lectura
          {...form.getInputProps("propertyId")}
        />
        <NumberInput
          withAsterisk
          label="Comisión"
          placeholder="1000000"
          min={1000}
          {...form.getInputProps("commission")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Atrás
          </Button>
          <Button type="submit">
            Siguiente
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Sales;