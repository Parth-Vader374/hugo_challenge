import React, { useEffect, useState } from "react";
import Address from "./Address/Address";
import Vehicle from "./Vehicles/Vehicle";
import InputValidation from "./InputValidation/InputValidation";
import { AddressInterface } from "./Address/AddressInterface";
import { VehicleInterface } from "./Vehicles/VehicleInterface";
import { response } from "express";

const InsuranceApplicationForm: React.FC = () => {
  const [applicantName, setApplicantName] = useState("");
  const [applicantAddress, setApplicantAddress] = useState<AddressInterface>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [vehicles, setVehicles] = useState<VehicleInterface[]>([
    { make: "", model: "", year: "", VIN: "" },
  ]);
  const [isValid, setIsValid] = useState(false);

  const handleApplicantNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApplicantName(event.target.value);
  };

  const handleApplicantAddressChange = (address: AddressInterface) => {
    setApplicantAddress(address);
  };

  const handleVehicleChange = (
    index: number,
    vehicleData: VehicleInterface
  ) => {
    setVehicles((prevState) => {
      const newVehicles = [...prevState];
      newVehicles[index] = vehicleData;
      return newVehicles;
    });
  };

  const handleAddVehicle = () => {
    if (vehicles.length < 3) {
      setVehicles([...vehicles, { make: "", model: "", year: "", VIN: "" }]);
    } else {
      alert("You cannot add more than 3 vehicles");
    }
  };

  const handleRemoveVehicle = (indexToRemove: number) => {
    setVehicles((prevState) => {
      const newVehicles = prevState.filter(
        (_, index) => index !== indexToRemove
      );
      return newVehicles;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNameValid = InputValidation.validateName(applicantName);
    console.log("isNameValid:", isNameValid);

    const isAddressValid = InputValidation.validateAddress(
      applicantAddress.street,
      applicantAddress.city,
      applicantAddress.state,
      applicantAddress.zipCode
    );
    console.log("isAddressValid:", isAddressValid);

    const isVehiclesValid = vehicles.every(
      (vehicle) =>
        InputValidation.validateModel(vehicle.make) &&
        InputValidation.validateModel(vehicle.model) &&
        InputValidation.validateYear(vehicle.year) &&
        InputValidation.validateVIN(vehicle.VIN)
    );
    console.log("isVehiclesValid:", isVehiclesValid);

    if (isNameValid && isAddressValid && isVehiclesValid) {
      setIsValid(true);
      console.log("isValid:", true);

      try {
        console.log("inside Try");
        await fetch("http://localhost:5000/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: applicantName.split(" ")[0],
            lastName: applicantName.split(" ")[1],
            address: applicantAddress,
            vehicles: vehicles,
          }),
        });

        console.log(
          `Application submitted successfully. Resume route:` //${resumeRoute}
        );
      } catch (error) {
        console.error(
          "An error occurred while submitting the application:",
          error
        );
      }
    } else {
      setIsValid(false);
      console.log("isValid:", false);
    }
  };

  return (
    <div>
      <h1>Insurance Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Applicant Name:
          <input
            type="text"
            value={applicantName}
            onChange={handleApplicantNameChange}
          />
        </label>
        <label>
          Applicant DOB:
          <input
            type="text"
            value={applicantName}
            onChange={handleApplicantNameChange}
          />
        </label>
        <br />
        <Address
          address={applicantAddress}
          onAddressChange={handleApplicantAddressChange}
        />
        <br />
        <h2>Vehicles</h2>
        {vehicles.map((vehicle, index) => (
          <Vehicle
            key={index}
            index={index}
            vehicle={vehicle}
            onVehicleChange={handleVehicleChange}
            onRemoveVehicle={handleRemoveVehicle}
          />
        ))}

        <button type="button" onClick={handleAddVehicle}>
          Add Vehicle
        </button>
        <br />
        <br />
        <button>Submit Application</button>
      </form>
      {isValid && <p>Application is valid</p>}
    </div>
  );
};

export default InsuranceApplicationForm;
