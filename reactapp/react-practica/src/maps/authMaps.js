export const getLoginMap = (form, errors, handleChange) => {
	const inputs = [
		{
			id: 1,
			type: "text",
			value: form.email,
			onChange: handleChange,
			label: "Email",
			placeholder: "Email",
			name: "email",
			error: errors.email,
		},
		{
			id: 2,
			type: "password",
			value: form.password,
			onChange: handleChange,
			label: "Password",
			placeholder: "Password",
			name: "password",
			error: errors.password,
		},
	];

	return inputs;
};
