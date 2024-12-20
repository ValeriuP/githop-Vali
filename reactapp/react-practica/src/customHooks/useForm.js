import { useState, useEffect } from "react";
import { validationRules } from "../utils/validations/validation";

export const useForm = (initialFormState) => {
	const [form, setForm] = useState(initialFormState);
	const [errors, setErrors] = useState(initialFormState);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		validateFields(name, value);
	};

	const validateFields = (fieldName, inputValue) => {
		let validationResponse = null;
		if (fieldName === "confirmPassword") {
			validationResponse = validationRules[fieldName](
				inputValue,
				form.password
			);
		} else {
			validationResponse = validationRules[fieldName](inputValue);
		}

		setErrors({ ...errors, [fieldName]: validationResponse });
	};

	useEffect(() => {
		const errorsArray = Object.values(errors).map(
			(repsonseObj) => repsonseObj && repsonseObj.success
		);
		const isValid = errorsArray.every((value) => value === true);

		setIsFormValid(isValid);
	}, [errors, form]);

	return { form, handleChange, errors, isFormValid };
};
