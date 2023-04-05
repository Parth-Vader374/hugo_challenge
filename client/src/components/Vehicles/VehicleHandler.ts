import InputValidation from "../InputValidation/InputValidation";
import { VehicleInterface } from "./VehicleInterface";

const VehicleHandler = {
  // validate a vehicle object
  validateVehicle: (vehicle: VehicleInterface): boolean => {
    // validate each field separately
    const validVIN = InputValidation.validateVIN(vehicle.VIN);
    const validYear = InputValidation.validateYear(vehicle.year);
    const validMake = InputValidation.validateModel(vehicle.make);
    const validModel = InputValidation.validateModel(vehicle.model);
    // return true if all fields are valid
    return validVIN && validYear && validMake && validModel;
  },

  // validate an array of vehicle objects
  validateVehicles: (vehicles: VehicleInterface[]): boolean => {
    // check if there is at least one vehicle and no more than 3
    if (vehicles.length < 1 || vehicles.length > 3) return false;
    // validate each vehicle object separately
    for (let i = 0; i < vehicles.length; i++) {
      if (!VehicleHandler.validateVehicle(vehicles[i])) return false;
    }
    // return true if all vehicles are valid
    return true;
  },
};

export default VehicleHandler;
