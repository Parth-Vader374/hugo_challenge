//This component is responsible renders a form to input information about the vehicle

import React from "react";
import { VehicleInterface } from "./VehicleInterface";
import "../../styles/vehicles.css";

//the interface which describes properties the vehicle component will be expecting
interface VehicleProps {
  vehicle: VehicleInterface; // object that contains information about the vehicle
  index: number; //current vehicle index
  onVehicleChange: (index: number, vehicleData: VehicleInterface) => void; //For any input fields that change
  onRemoveVehicle: (indexToRemove: number) => void; //When the vehicle is removed
  key: number;
}

// Destructuring the props to use within the component
const Vehicle: React.FC<VehicleProps> = ({
  key,
  index,
  vehicle,
  onVehicleChange,
  onRemoveVehicle,
}) => {
  const handleMakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicleData = { ...vehicle, make: event.target.value };
    onVehicleChange(index, newVehicleData);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicleData = { ...vehicle, model: event.target.value };
    onVehicleChange(index, newVehicleData);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicleData = { ...vehicle, year: event.target.value };
    onVehicleChange(index, newVehicleData);
  };

  const handleVINChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVehicleData = { ...vehicle, VIN: event.target.value };
    onVehicleChange(index, newVehicleData);
  };

  const handleRemoveClick = () => {
    onRemoveVehicle(index);
  };

  return (
    <div className="vehicle-form" key={key}>
      <h2>Vehicle {index + 1}</h2>
      <label>
        Make
        <input type="text" value={vehicle.make} onChange={handleMakeChange} />
      </label>
      <label>
        Model
        <input type="text" value={vehicle.model} onChange={handleModelChange} />
      </label>
      <label>
        Year
        <input type="text" value={vehicle.year} onChange={handleYearChange} />
      </label>
      <label>
        VIN
        <input type="text" value={vehicle.VIN} onChange={handleVINChange} />
      </label>
      <button onClick={handleRemoveClick}>Remove Vehicle</button>
    </div>
  );
};

export default Vehicle;
