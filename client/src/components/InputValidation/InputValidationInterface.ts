//Define the interface with all the validation methods
//Can add more methods depending on the type of validations required
interface InputValidationInterface {
  validateName(name: string): boolean;
  validateDate(date: string): boolean;
  validateVIN(vin: string): boolean;
  validateYear(year: string): boolean;
  validateModel(model: string): boolean;
  validateDOB(dob: string): boolean;
  validateAddress(
    street: string,
    city: string,
    state: string,
    zipCode: string
  ): boolean;
}

export default InputValidationInterface;
