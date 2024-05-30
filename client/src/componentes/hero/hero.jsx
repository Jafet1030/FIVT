import React from 'react'
import "./hero.css"
import CountUp from 'react-countup'
import {motion} from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar'
import SearchBarHome from '../SearchBar/SearchBarHome'
function Hero() {
  return (
    <section className='hero-wrapper'>
        <div className='paddings innerWidth hero-container flexCenter'>

                <div className='flexColStart hero-left'>

                    <div className="hero-title">

                        <div className="orange-circle"/>
            
                        <motion.h1
                        initial={{y:"2rem",opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{
                            duration:4,
                            type:"spring"
                        }}
                        >
                            Encuentra <br/> Tu Espacio <br/> Ideal
                        </motion.h1>
                         <div className="flexColStart hero-des">
                            <span className='secondaryText'>Creemos que cada hogar tiene una historia única <br/></span>
                            <span className='secondaryText'>Permítenos ayudarte a escribir la tuya encontrando el espacio ideal</span>
                        </div>

                        <SearchBarHome/>
                        
                        <div className="flexCenter stats">
                            <div className="flexColCenter stat">
                                <span>
                                    <CountUp start={400} end={500} duration={5}/>
                                    <span>+</span>
                                    </span><span className='secondaryText'>
                                        Propiedades Premium
                                    </span>
                            </div>

                            <div className="flexColCenter stat">
                                <span>
                                    <CountUp start={900} end={1000} duration={5}/>
                                    <span>+</span>
                                    </span><span className='secondaryText'>
                                        Clientes Satisfechos
                                    </span>
                            </div>

                            <div className="flexColCenter stat">
                                <span>
                                    <CountUp start={1} end={15} duration={5}/>
                                    <span>+</span>
                                    </span><span className='secondaryText'>
                                        Años de Experiencia
                                    </span>
                            </div>


                        </div>
                    </div>
                </div>

                <div className='flexCenter hero-right'>
                    <motion.div
                                            initial={{y:"2rem",opacity:0}}
                                            animate={{y:0,opacity:1}}
                                            transition={{
                                                duration:4,
                                                type:"spring"
                                            }}
                    className='image-container'>
                        <img src="./images/image.container.jpg" alt="Casa" />
                </motion.div>
                </div>

        </div>


    </section>
  )
}

export default Hero