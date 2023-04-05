import { AddressInterface } from "./AddressInterface";

class AddressHandler {
  static validateAddress(address: AddressInterface): boolean {
    // implement address validation logic here by calling third party API's if needed
    // below code returns false, if one of these fields is missing and true otherwise
    return (
      address.street.trim() !== "" &&
      address.city.trim() !== "" &&
      address.state.trim() !== "" &&
      address.zipCode.trim() !== ""
    );
  }
}

export default AddressHandler;
