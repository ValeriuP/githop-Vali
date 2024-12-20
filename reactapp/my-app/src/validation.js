const EMAIL_REGEX = new RegExp(/\S+@\S+\.\S+/);
// const NAMES_REGEX = new RegExp(/^[^\d\s]+$/);
// const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
// const MIN_AGE = 18;
// const MAX_AGE = 100;

const validateEmail = (inputValue) => {
	let validationResponse = {
		success: null,
		message: null,
	};
	if (!inputValue) {
		validationResponse.message = "Email is required";
		validationResponse.success = false;
	} else if (!EMAIL_REGEX.test(inputValue)) {
		validationResponse.message = "Email is in the wrong format";
		validationResponse.success = false;
	} else {
		validationResponse.message = "";
		validationResponse.success = true;
	}
	return validationResponse;
};

const validateName =(inputValue)=>{
	let validationResponse= {
		succes
	}
}

if (fieldName === "firstName") {
  if (!inputValue) {
    newErrors.firstName = "First Name is required";
    setIsFormValid(false);
  } else if (inputValue.length < 2) {
    newErrors.firstName = "First Name must have at least 2 charachters";
    setIsFormValid(false);
  } else if (!NAMES_PATTERN.test(inputValue)) {
    newErrors.firstName = "First name can't contain numbers";
    setIsFormValid(false);
  } else {
    newErrors.firstName = "";
    // setIsFormValid(true);
  }
}
if (fieldName === "lastName") {
  if (!inputValue) {
    newErrors.lastName = "Last Name is required";
    setIsFormValid(false);
  } else if (inputValue.length < 2) {
    newErrors.lastName = "Last Name must have at least 2 charachters";
    setIsFormValid(false);
  } else if (!NAMES_PATTERN.test(inputValue)) {
    newErrors.lastName = "Last name can't contain numbers";
    setIsFormValid(false);
  } else {
    newErrors.lastName = "";
    // setIsFormValid(true);
  }
}
if (fieldName === "age") {
  if (!inputValue) {
    newErrors.age = "Age is required";
    setIsFormValid(false);
  } else if (isNaN(inputValue)) {
    newErrors.age = "Age must be a number!";
    setIsFormValid(false);
  } else if (inputValue < 18) {
    newErrors.age = "Must be older than 18 years old!";
    setIsFormValid(false);
  } else if (inputValue > 100) {
    newErrors.age = "Must be younger than 100 years old!";
    setIsFormValid(false);
  } else {
    newErrors.age = "";
    // setIsFormValid(true);
  }
}
if (fieldName === "password") {
  if (!inputValue) {
    newErrors.password = "Password is required";
    setIsFormValid(false);
  } else {
    newErrors.password = "";
    // setIsFormValid(true);
  }
}
if (fieldName === "confirmPassword") {
  if (!inputValue) {
    newErrors.confirmPassword = "Confirm Password is required";
    setIsFormValid(false);
  } else if (inputValue !== form.password) {
    newErrors.confirmPassword = "Passwords do not match";
    setIsFormValid(false);
  } else {
    newErrors.confirmPassword = "";
    // setIsFormValid(true);
  }
}

export const validationRules = {
	email: validateEmail,
};
