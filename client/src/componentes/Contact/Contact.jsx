import React from 'react'
import './Contact.css'
import {MdCall} from 'react-icons/md'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'

const Contact =() => {
  return (
    <section className="c-wrapper">
        <div className="paddings innerWidth flexCenter c-container">
            {/*left*/}
            <div className="flexColStart c-left">
            <span className='orangeText'>Contáctanos</span>
            <span className='primaryText'>De La Manera Más Sencilla</span>
            <span className='secondaryText'>Siempre estaremos listos para apoyarte y brindarte el mejor servicio encontrando el hogar de tus sueños</span>

                <div className="flexColStart contactModes">
                    <div className="flexStart row">
                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <MdCall size={25}/>
                                 </div>
                                 <div className="flexColStart detail">
                                    <span className='primaryText'>Llamar</span>
                                    <span className='secondaryText'></span>
                                 </div>
                            </div>
                            <div className="flexCenter button">LLame Ahora</div>
                        </div>
                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <BsFillChatDotsFill size={25}/>
                                 </div>
                                 <div className="flexColStart detail">
                                    <span className='primaryText'>Chatear</span>
                                    <span className='secondaryText'></span>
                                 </div>
                            </div>
                            <div className="flexCenter button">Escribir Ahora</div>
                        </div>
                    </div>
                    <div className="flexStart row">
                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <BsFillChatDotsFill size={25}/>
                                 </div>
                                 <div className="flexColStart detail">
                                    <span className='primaryText'>VideoLlamada</span>
                                    <span className='secondaryText'></span>
                                 </div>
                            </div>
                            <div className="flexCenter button">Comenzar VideoLlamada</div>
                        </div>
                        <div className="flexColCenter mode">
                            <div className="flexStart">
                                <div className="flexCenter icon">
                                    <HiChatBubbleBottomCenter size={25}/>
                                 </div>
                                 <div className="flexColStart detail" >
                                    <span className='primaryText'>WhatsApp</span>
                                    <span className='secondaryText'></span>
                                 </div>
                            </div>
                            <div className="flexCenter button" >
                                <a href="http://wa.me/+5214427560740" target="_blank" rel="noreferrer">Contactar Agente</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*right*/}
            <div className="c-right">
                <div className="image-container">
                    <img src="./images/r1.png" alt="HomeCasa"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact