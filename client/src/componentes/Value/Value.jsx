import React, { useState } from 'react';
import './Value.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from 'react-icons/md';
import data from '../../utils/accordion';

const Value = () => {
    return (
        <section className="v-wrapper">
            <div className="paddings innerWidth flexCenter v-container">
                {/* lado izquierdo */}
                <div className="v-left">
                    <div className="image-container">
                        <img src="/images/r1.png" alt="values" />
                    </div>
                </div>
                {/* lado derecho */}
                <div className="flexColStart v-right">
                    <span className='orangeText'>Nuestros Valores</span>
                    <span className='primaryText'>Valor Que Ofrecemos</span>
                    <span className='secondaryText'>Trabajamos incansablemente para satisfacer las necesidades de nuestros clientes, 
                        <br />
                        clientes brindando un servicio excepcional en cada etapa del proceso 
                    </span>

                    <Accordion
                        className='accordion'
                        allowMultipleExpanded={false}
                        preExpanded={[0]}
                    >
                        {
                            data.map((item, i) => {
                                const [className, setClassName] = useState(null);
                                return (
                                    <AccordionItem className={`accordionItem ${className}`} key={i} uuid={i}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='flexCenter accordionButton'>
                                                <AccordionItemState>
                                                    {({ expanded }) =>
                                                        expanded
                                                            ? setClassName("expanded")
                                                            : setClassName("collapsed")
                                                    }
                                                </AccordionItemState>
                                                <div className="flexCenter icon">{item.icon}</div>
                                                <span className="primaryText">
                                                    {item.heading}
                                                </span>
                                                <div className="flexCenter icon">
                                                    <MdOutlineArrowDropDown size={20} />
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p className="secondaryText">{item.detail}</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                );
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

export default Value;
