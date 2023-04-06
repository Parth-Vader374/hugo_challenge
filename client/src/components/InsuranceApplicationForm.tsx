import React, { useEffect, useMemo, useState } from "react";
import Address from "./Address/Address";
import Vehicle from "./Vehicles/Vehicle";
import InputValidation from "./InputValidation/InputValidation";
import { AddressInterface } from "./Address/AddressInterface";
import { VehicleInterface } from "./Vehicles/VehicleInterface";
import "../styles/InsuranceApplicationForm.css";

const InsuranceApplicationForm: React.FC = () => {
  const [applicantName, setApplicantName] = useState("");
  const [applicantDOB, setApplicantDOB] = useState("");

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

  const handleApplicantDOBChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApplicantDOB(event.target.value);
  };

  // const handleApplicantInfoChange = (name: string, dob: string) => {
  //   setApplicantName(name);
  //   setApplicantDOB(dob);
  // };

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
      alert("You cannot add more than 3 vehicles!");
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

  // Validating the application and caching to improve performance
  const validateApplication = useMemo(() => {
    const isNameValid = InputValidation.validateName(applicantName);
    const { street, city, state, zipCode } = applicantAddress;
    const isAddressValid = InputValidation.validateAddress(
      street,
      city,
      state,
      zipCode
    );

    const isVehiclesValid = vehicles.every(
      ({ make, model, year, VIN }) =>
        InputValidation.validateModel(make) &&
        InputValidation.validateModel(model) &&
        InputValidation.validateYear(year) &&
        InputValidation.validateVIN(VIN)
    );

    return isNameValid && isAddressValid && isVehiclesValid;
  }, [applicantName, applicantAddress, vehicles]);

  //Handles all the validation and submits to the backend.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateApplication) {
      setIsValid(validateApplication);
      const formData = {
        name: applicantName,
        dob: applicantDOB,
        address: applicantAddress,
        vehicles: vehicles,
      };

      try {
        const response = await fetch("http://localhost:5000/api/application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const { resumeRoute } = await response.json(); // Parse the response body to get the resume route
          alert("Application submitted successfully!");

          // Store the resumeRoute in localStorage
          localStorage.setItem("resumeRoute", resumeRoute);

          // Store the form data in localStorage
          localStorage.setItem("formData", JSON.stringify(formData));

          // Get only the ID from the resume route
          const id = resumeRoute.split("/").pop();
          // Make another fetch request to get the price
          const priceResponse = await fetch(
            `http://localhost:5000/api/application/${id}/validate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          if (priceResponse.ok) {
            const { price } = await priceResponse.json();
            alert(`The price for your application is ${price}`);
          } else {
            alert("Error fetching price");
          }

          //Resume the route
          window.location.href = resumeRoute;
        }
      } catch (error) {
        console.log(error);
        alert("Error submitting application");
      }
    } else {
      setIsValid(false);
      alert("Please enter valid information for all fields.");
    }
  };

  // This will set the fields in the form to match the current created application
  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setApplicantName(parsedFormData.name);
      setApplicantDOB(parsedFormData.dob);
      setApplicantAddress(parsedFormData.address);
      setVehicles(parsedFormData.vehicles);
    }
  }, []);

  return (
    <div className="insurance-application-form">
      <h1>Insurance Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={applicantName}
            onChange={handleApplicantNameChange}
          />
        </label>

        <label>
          Date of Birth (YYYY-MM-DD)
          <input
            type="text"
            value={applicantDOB}
            onChange={handleApplicantDOBChange}
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
