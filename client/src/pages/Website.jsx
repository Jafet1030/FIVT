import React from 'react'
import Header from '../componentes/header/header';
import Hero from '../componentes/hero/hero';
import Residencias from '../componentes/residencias/residencias';
import Value from '../componentes/Value/Value';
import Contact from '../componentes/Contact/Contact';
import GetStarted from '../componentes/GetStarted/GetStarted';
import Footer from '../componentes/Footer/Footer';

const Website=()=> {
  return (
    <div className="App">
            <div>
                <div className="white-gradient" />
                <Hero />
            </div>
            <div className="resi">
                <Residencias />
            </div>
            <Value />
            <Contact />
            <GetStarted/>
        </div>
  )
}

export default Website 