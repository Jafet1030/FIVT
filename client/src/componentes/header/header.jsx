import React, { useState, useEffect } from 'react';
import './header.css';
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from 'react-router-dom';
import useHeaderColor from "../../hooks/useHeaderColor";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { getMenuStyles } from '../../utils/common';
import "@mantine/core/styles.css"
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import useAuthCheck from "../../hooks/useAuthCheck";



const header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();


  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  // Efecto para manejar el redimensionamiento de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (document.documentElement.clientWidth > 768) {
        setMenuOpened(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='h-wrapper'>
      <div className='flexCenter paddings innerWidth h-container'>
        <Link to ="/">
          <img src='./images/FIVT.png' alt='logo' width={100} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
        <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Propiedades</NavLink>

            <a href="mailto:jmm.daniel.10@gmail.com">Contact</a>

            {/* agregar propiedad */}
            <div onClick={handleAddPropertyClick}>Agregar Propiedades</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            {/* login button */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setMenuOpened(prev => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default header;
