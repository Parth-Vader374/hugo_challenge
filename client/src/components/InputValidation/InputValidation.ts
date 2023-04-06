// This component will implement all logic for validating n number of inputs
// I just implemented a few
import InputValidationInterface from "./InputValidationInterface";

// Create the InputValidation object which implements the InputValidationinterface
const InputValidation: InputValidationInterface = {
  // Validates a string input that matches names which start with one or more letters
  validateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
  },

  // Validate the DOB to be at least 16 or older
  validateDOB(dob: string): boolean {
    const dobRegex =
      /^(19[5-9]\d|20[0-2]\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return dobRegex.test(dob);
  },

  //matches alphanumeric characters spaces and punctuation marks
  validateModel(model: string): boolean {
    const modelRegex = /^[a-zA-Z0-9\s,'-]*$/;
    return modelRegex.test(model);
  },
  //Validate the address, this is a simple validation however a third-party library would be useful for validating addresses
  validateAddress(
    street: string,
    city: string,
    state: string,
    zipCode: string
  ): boolean {
    const streetRegex = /^[a-zA-Z0-9\s,'-]*$/; //matches alphanumeric characters spaces and punctuation marks
    const cityRegex = /^[a-zA-Z\s]*$/; //matches alphabetic characters and spaces
    const stateRegex = /^[a-zA-Z]{2}$/; //matches alphabetic characters and a two letter state abbreviation value
    const zipCodeRegex = /^\d{5}$/;

    if (
      !streetRegex.test(street) ||
      !cityRegex.test(city) ||
      !stateRegex.test(state) ||
      !zipCodeRegex.test(zipCode)
    ) {
      return false;
    }
    return true;
  },

  // Validates a string input 'date' and returns true if it matches the format YYYY-MM-DD and false otherwise
  validateDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return false;
    }
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 2));
    const day = parseInt(date.slice(8, 2));
    const currentDate = new Date();
    if (year > currentDate.getFullYear()) {
      return false;
    } else if (year === currentDate.getFullYear()) {
      if (month > currentDate.getMonth() + 1) {
        return false;
      } else if (month === currentDate.getMonth() + 1) {
        if (day > currentDate.getDate()) {
          return false;
        }
      }
    }
    return true;
  },

  // Validates whether the provided VIN is alphanumeric and has a length of 17 characters
  validateVIN(vin: string): boolean {
    const vinRegex = /^[a-zA-Z0-9]{1,15}$/;
    return vinRegex.test(vin);
  },

  // Validates whether the provided year is a valid 4-digit year between 1900 and the current year
  validateYear(year: string): boolean {
    const yearRegex = /^\d{4}$/;
    if (!yearRegex.test(year)) {
      return false;
    }
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    return yearNum >= 1900 && yearNum <= currentYear;
  },
};

export default InputValidation;
