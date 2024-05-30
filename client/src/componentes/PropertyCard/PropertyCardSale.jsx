import React from 'react'
import './PropertyCardSale.css'
import {AiFillHeart} from 'react-icons/ai'
import {truncate} from 'lodash'
import { useNavigate } from 'react-router-dom'
import Heart from '../Hearth/Hearth'

const PropertyCardSale = ({card}) => {
  return (

    <div className="flexColStart r-card" 
    >


        <Heart id={card?.id}/>
        <img src={card.image} alt='CASA1'/>
        <span className="secondaryText r-price">
            <span style={{color:"orange"}}>$</span><span>{card.price}</span>
        </span>
        <span className='primaryText'>{truncate(card.title, {length:15})}</span>
        <span style={{color:"rgb(140 139 139)"}}>{truncate(card.description, {length:80})}</span>
    </div>
  )
}

export default PropertyCardSale