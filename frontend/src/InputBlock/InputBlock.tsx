// import React from 'react'
// import { ChevronDoubleRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import classes from './InputBlock.module.css';
//import { AddressForm } from "../AddressForm/AddressForm";
import { useState, useEffect } from "react";
// import { AddressForm } from "../AddressForm/AddressForm";
// import Button, { ButtonIcons } from "../Button/Button";
import TransportType from '../TransportType/TransportType';

const InputBlock = ({ idx, location, maxTravelTime, transportType, onUpdate }) => {
    // const [locationInput, setLocationInput] = useState("");
    // const [maxTravelTime, setMaxTravelTime] = useState(0);

  return (

    <div className={classes.wrapper}>
                <input className={classes.inputBar} type="text" name="" id="" value={location} 
                onChange={(e) => onUpdate(idx, "location", e.target.value)}  onKeyDown={(e) => {
                    }} placeholder="Your Location"/>
            <div className={classes.travelWrapper}>
                <p className={classes.travelTimeMsg}>Travel Time:</p>
                <input className={classes.travelTime} type="number" name="" id="" value={maxTravelTime} 
                onChange={(e) => onUpdate(idx, "maxTravelTime", Number(e.target.value))}  onKeyDown={(e) => {
                        }} placeholder="Max travel time here"/>
            </div>
            <TransportType type={transportType}
                setType={(value) => onUpdate(idx, "transportationType", value)}></TransportType>
    </div>
  )
}

export default InputBlock