import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import React, { useContext } from "react";
import UseDetailedContext from "../../context/UseDetailedContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { createSales, getProperty, updateResidency } from "../../utils/api";
import { useLocation } from "react-router-dom";
import "./getSaleProperty.css";


const SaleProperty = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  const handleSubmit = () => {
    setPropertyDetails((prev)=> ({...prev}))
    mutate();
  }


// ==================== upload logic
const { user } = useAuth0();
const {
  userDetails: { token },
} = useContext(UseDetailedContext);
const { refetch: refetchProperties } = useProperties();

const { mutate, isLoading } = useMutation({
  mutationFn: () => createSales({
    ...propertyDetails,
  }, token),
  onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
  onSettled: () => {
    updateResidency({ propertyId: propertyDetails.propertyId }, token)
      .then(() => {
        toast.success("Agregado exitosamente", { position: "bottom-right" });
        setPropertyDetails({
          seller: "",
          commission: 0,
          propertyId: "",
          userEmailRegistered: user?.email,
        });
      })
      .catch(({ response }) => toast.error(response.data.message, { position: "bottom-right" }));
      setOpened(false)
    setActiveStep(0)
    refetchProperties()
  },
});

return (
  <Box maw="30%" mx="auto" my="sm">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >  <img src={data?.image} alt="home image" className="propertysale-image" />
      <div className="propertysale-details">
        <span className="primaryText">{data?.title}</span>
        <span className="orangeText" style={{ fontSize: "1.5rem" }}>
          ${data?.price}
        </span>
      </div>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Atrás
        </Button>
        <Button type="submit" color="green" disabled={isLoading}>
          {isLoading ? "Enviando" : "Agregar venta"}
        </Button>
      </Group>
    </form>
  </Box>
);

};
export default SaleProperty;