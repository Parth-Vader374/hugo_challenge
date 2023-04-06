import React from "react";
import { AddressInterface } from "./AddressInterface";
import "../../styles/address.css";
interface AddressProps {
  address: AddressInterface;
  onAddressChange: (address: AddressInterface) => void;
}

const Address: React.FC<AddressProps> = ({ address, onAddressChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onAddressChange({ ...address, [name]: value });
  };

  return (
    <div className="address-form">
      <label htmlFor="street">Street</label>
      <input
        type="text"
        id="street"
        name="street"
        value={address.street}
        onChange={handleInputChange}
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        value={address.city}
        onChange={handleInputChange}
      />

      <label htmlFor="state">State</label>
      <input
        type="text"
        id="state"
        name="state"
        value={address.state}
        onChange={handleInputChange}
      />

      <label htmlFor="zipCode">Zip Code</label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        value={address.zipCode}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Address;
