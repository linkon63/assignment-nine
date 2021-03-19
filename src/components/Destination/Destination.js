import React from 'react';
import { useHistory, useParams } from 'react-router';
import fakeData from '../../fakeData/fakeData.json'
import MapImg from '../../images/Map.png';
import Contact from '../Contact/Contact';
import './Destination.css';
import Sideber from './Sideber/Sideber';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import MapOpen from './Map/MapOpen';
const Destination = () => {
    const [destination, setDestination] = useState({});
    const [showData, setShowData] = useState(false);
    const {name} = useParams();
    const vehicleData = fakeData.find(vehicle => vehicle.name === name);
    // console.log(vehicleData);
    // console.log(name);
    
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        const {FROM, TO} = data;
        console.log(FROM, TO);
        setDestination({from: FROM, to: TO});
        setShowData(true);
    };

    return (
        <div className="destination-container">
            <div className="sidebar">
                <h5>Your Selected Vehicle : {vehicleData.name}</h5>

                <form onSubmit={handleSubmit(onSubmit)}>   
                    <select name="FROM" ref={register}>
                        <option value="mirpur">Mirpur</option>
                        <option value="gazipur">Gazipur</option>
                        <option value="uttora">Uttora</option>
                    </select>
                    <br />
                    <select name="TO" ref={register}>
                        <option value="badda">Badda</option>
                        <option value="tongi">Tongi</option>
                        <option value="mohammadpur">Mohammadpur</option>
                    </select>
                    <br />
                    <input type="submit" />
                </form>
                <p>Pick from : {destination.from}</p>
                <p>Pick To : {destination.to}</p>
                {showData && 
                     <div className="vehicle-data">
                        <div>
                            <img src={vehicleData.img} alt=""/>
                        </div>
                        <div className="data-description">
                            <h6>Persion : {vehicleData.sit}</h6>
                            <h6>Cost Per/Hour: $59</h6>
                        </div>
                      </div>
                }
            </div>
            <div className="map-container">
                {/* <MapOpen></MapOpen> */}
                <img src={MapImg} alt=""/>
            </div>
        </div>
    );
};

export default Destination;