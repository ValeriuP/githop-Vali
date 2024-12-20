const EMAIL_REGEX = new RegExp(/\S+@\S+\.\S+/);
const NAMES_REGEX = new RegExp(/^[^\d\s]+$/);
const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
const MIN_AGE = 18;
const MAX_AGE = 100;

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

const validateFirstName = (inputValue) => {
	let validationResponse = {
		success: null,
		message: null,
	};
	if (!inputValue) {
		validationResponse.message = "Firstname is required";
		validationResponse.success = false;
	} else if (inputValue.length < 2) {
		validationResponse.message = "Firstname must have at least 2 charachters";
		validationResponse.success = false;
	} else if (!NAMES_REGEX.test(inputValue)) {
		validationResponse.message = "Firstname can't contain numbers";
		validationResponse.success = false;
	} else {
		validationResponse.message = "";
		validationResponse.success = true;
	}
	return validationResponse;
};

const validateLastName = (inputValue) => {
	let validationResponse = {
		success: null,
		message: null,
	};
	if (!inputValue) {
		validationResponse.message = "Lastname is required";
		validationResponse.success = false;
	} else if (inputValue.length < 2) {
		validationResponse.message = "Lastname must have at least 2 charachters";
		validationResponse.success = false;
	} else if (!NAMES_REGEX.test(inputValue)) {
		validationResponse.message = "Lastname can't contain numbers";
		validationResponse.success = false;
	} else {
		validationResponse.message = "";
		validationResponse.success = true;
	}
	return validationResponse;
};

const validateAge = (inputValue) => {
	let validationResponse = {
		success: null,
		message: null,
	};
	if (!inputValue) {
		validationResponse.message = "Age is required";
		validationResponse.success = false;
		return validationResponse;
	}
	if (isNaN(inputValue)) {
		validationResponse.message = "Age must be a number!";
		validationResponse.success = false;
		return validationResponse;
	}
	if (inputValue < MIN_AGE) {
		validationResponse.message = "Must be older than 18 years old!";
		validationResponse.success = false;
		return validationResponse;
	}
	if (inputValue > MAX_AGE) {
		validationResponse.message = "Must be younger than 100 years old!";
		validationResponse.success = false;
		return validationResponse;
	}

	validationResponse.message = "";
	validationResponse.success = true;

	return validationResponse;
};

const validatePassword = (inputValue) => {
	let validationResponse = {
		success: null,
		message: null,
	};
	if (!inputValue) {
		validationResponse.message = "Password is required";
		validationResponse.success = false;
	} else if (!PASSWORD_REGEX.test(inputValue)) {
		validationResponse.message = "Password is in the wrong format!";
		validationResponse.success = false;
	} else {
		validationResponse.message = "";
		validationResponse.success = true;
	}
	return validationResponse;
};

const validateConfirmPassword = (inputValue, passwordValue) => {
	let validationResponse = {
		success: null,
		message: null,
	};
	if (!inputValue) {
		validationResponse.message = "Confirm password is required";
		validationResponse.success = false;
	} else if (passwordValue !== inputValue) {
		validationResponse.message = "Passwords do not match!";
		validationResponse.success = false;
	} else {
		validationResponse.message = "";
		validationResponse.success = true;
	}
	return validationResponse;
};

export const validationRules = {
	email: validateEmail,
	firstName: validateFirstName,
	lastName: validateLastName,
	age: validateAge,
	password: validatePassword,
	confirmPassword: validateConfirmPassword,
};
