import React from 'react'
import './Footer.css'
const Footer=()=> {
  return (
    <section className="f-wrapper">
        <div className="padding innerWidth flexCenter f-container">
            <div className="flexColStart f-left">
                <img src='/images/FIVT.PNG' alt='' width={120}/>
                <span className="secondaryText">
                Nuestra visión es hacer de cada lugar  <br/>
                el mejor hogar para las personas.
                </span>
            </div>

            <div className="flexColStart f-right">
                <span className='primaryText'>Información</span>
                <span className='secondaryText'>Campo Real 990, El Refugio, 76146 Santiago de Querétaro, Qro.</span>

                <div className="flexCenter f-menu">
                    <span>Propiedad</span>
                    <span>Servicios</span>
                    <span>Productos</span>
                    <span>Nosotros</span>
                </div>

            </div>

        </div>

    </section>
  )
}

export default Footer