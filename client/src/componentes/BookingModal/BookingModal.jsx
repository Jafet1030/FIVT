import React, { useContext, useState, useEffect } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UseDetailedContext from "../../context/UseDetailedContext.js";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx'; 
import '@mantine/dates/styles.css';

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UseDetailedContext);

  // Configura dayjs para usar la localización en español de México
  useEffect(() => {
    dayjs.locale('es-mx');
  }, []);

  const handleBookingSuccess = () => {
    toast.success("Acabas de hacer una cita", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Selecciona el día de cita"
      centered
    >
      <div className="flexColCenter" style={{gap: "1rem"}}>
        <DatePicker 
          value={value} 
          onChange={setValue} 
          minDate={new Date()}
          locale="es-mx" // Asegúrate de que el DatePicker también use el locale correcto si es compatible
        />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Reservar visita
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
