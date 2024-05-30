import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Sales from "../sales/sales.jsx";
import { useLocation } from "react-router-dom";
import SaleProperty from "../getSaleProperty/getSaleProperty.jsx";


const registerSaless = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const [userPassword, setUserPassword] = useState("");
  const correctPassword = "FIVT";

  const [propertyDetails, setPropertyDetails] = useState({
    seller: "",
    propertyId: id,
    commission: 0,
    userEmailRegistered: user?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Contraseña" description="Verificar contraseña">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                style={{ margin: '10px', padding: '5px' }}
              />
              <button
                onClick={() => {
                  if (userPassword === correctPassword) {
                    nextStep();
                  } else {
                    alert("Contraseña incorrecta");
                  }
                }}
                style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Verificar contraseña y continuar
              </button>
            </div>
          </Stepper.Step>

          <Stepper.Step label="Registrar Venta" description="Registra la venta">
            <Sales
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step label="Confirmación" description="Confirma la propiedad">
            <SaleProperty
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
            />
          </Stepper.Step>

          <Stepper.Completed>
            Completado, haz click en el boton de "Atras" si quieres regresar.
          </Stepper.Completed>

        </Stepper>
      </Container>
    </Modal>
  );
};

export default registerSaless;