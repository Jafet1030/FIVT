import React from 'react';
import { sliderSettings } from '../../utils/common';
import './residencias.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import 'swiper/css';
import PropertyCard from '../PropertyCard/PropertyCard';
import useProperties from '../../hooks/useProperties';
import { PuffLoader } from "react-spinners";


const SliderButtons = () => {
    const swiper = useSwiper();
    return (
        <div className="r-buttons">
            <button onClick={() => swiper.slidePrev()}>&lt;</button>
            <button onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    );
};

function Residencias() {
    const { data, isError, isLoading } = useProperties();  

    if (isError) {
        return (
          <div className="wrapper">
            <span>Error al obtener datos</span>
          </div>
        );
      }
      if (isLoading) {
        return (
          <div className="wrapper flexCenter" style={{ height: "60vh" }}>
            <PuffLoader
              height="80"
              width="80"
              radius={1}
              color="#4066ff"
              aria-label="puff-loading"
            />
          </div>
        );
      }


  return (
    <div id="residencies" className="r-wrapper">
        <div className="paddings innerWidth r-container">
            <div className="r-head flexColStart">
                <span className='orangeText'>Mejores Opciones</span>
                <span className='primaryText'>Residencias Populares</span>
            </div>

            
            <Swiper {...sliderSettings}>
                <SlideNextButton />

                {data.slice(0,8).map((card, i) => (
                    <SwiperSlide key={i}>
                        <PropertyCard card={card}/>
                    </SwiperSlide>
                    ))}
                <SliderButtons />
            </Swiper>
        </div>
    </div>
  );
}

export default Residencias;


const SlideNextButton = () => {
    const swiper = useSwiper();
    return (
      <div className="flexCenter r-buttons">
        <button onClick={() => swiper.slidePrev()} className="r-prevButton">
          &lt;
        </button>
        <button onClick={() => swiper.slideNext()} className="r-nextButton">
          &gt;
        </button>
      </div>
    );
  };