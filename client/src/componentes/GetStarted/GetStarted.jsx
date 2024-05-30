import React from 'react'
import './GetStarted.css'
const GetStarted=() =>{
  return (
    <section className="g-wrapper">
        <div className="paddings innerWidth g-container">
            <div className="flexColCenter inner-container">
                <span className='primaryText'>Comenzar con FIVT</span>
                <span className='secondaryText'>
                  Suscríbete y encuentra precios realmente atractivos con nosotros.
                <br/>
                Encuentra tu futuro hogar pronto.
                </span>
                <button className="button">
                    <a href='mailto:sebastianjimazz@gmail.com'>Comenzar</a>
                </button>
            </div>
        </div>
    </section>
  )
}

export default GetStarted