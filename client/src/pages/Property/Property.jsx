import React, { useContext,useState } from 'react'
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from '../../utils/api';
import { PuffLoader } from "react-spinners";
import "./Property.css";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Mapa from '../../componentes/Map/Mapa';
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../componentes/BookingModal/BookingModal";
import "@mantine/core/styles.css"
import UseDetailedContext from "../../context/UseDetailedContext.js";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../componentes/Hearth/Hearth";
import RegisterSales from '../../componentes/registerSales/registerSaless.jsx';


const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const[modalOpened,setModalOpened]=useState(false)
  const{validateLogin} = useAuthCheck()
  const{user}=useAuth0()

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UseDetailedContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Reserva cancelada", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error al obtener los detalles de la propiedad</span>
        </div>
      </div>
    );
  }

  

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">

        {/* like button */}
        <div className="like">
          <Heart id={id}/>
        </div>

        {/* imagen */}
        <img src={data?.image} alt="home image" />
        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* baños */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Baños</span>
              </div>

              {/* estacionamientos */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Estacionamiento</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Habitaciones</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}{" "}
                {data?.city}{", "}
                {data?.country}
              </span>
              
            </div>

            {/* booking button */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancelar cita</span>
                </Button>
                <span>
                  Tu cita ya fue reservada para esta fecha{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Reserva tu cita
              </button>
            )}
            
            

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
          <div className="map">
            <Mapa
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
          
        </div>
        
      </div>
      <section className="g-wrapper">
        <div className="paddings innerWidth g-container">
          <div className="flexColCenter inner-container">
            <span className="primaryText">Registrar ventas</span>
            <Button onClick={() => setShowForm(true)}>Registrar</Button>
            {showForm && (
              <RegisterSales opened={showForm} setOpened={setShowForm} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Property