import React from 'react';
import { useHistory } from 'react-router';
import Destination from '../Destination/Destination';
import './Body.css';

const Body = (props) => {
    const {id,name, img} = props.vehicleInfo;
    const history = useHistory();
    const handleVehicle = (name) => {
        history.push(`/destination/${name}`);
    }
    return (
        <div onClick={()=>{handleVehicle(name)}} className="vehicle-card">
            <img src={img} alt=""/>
            <br/>
            <h4>{name}</h4>

        </div>
    );
};

export default Body;