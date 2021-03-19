import React from 'react';
import Vehicle from '../../fakeData/fakeData.json';
import Body from './Body';
import './Home.css';
const Main = () => {
    const vehiclesData = Vehicle;
    return (
        <div className="vehicle-card-container">
            {
                vehiclesData.map(vehicle => <Body vehicleInfo={vehicle} key={vehicle.id}></Body>)
            }
        </div>
    );
};

export default Main;