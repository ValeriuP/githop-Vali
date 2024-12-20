import { useForm } from "../../../customHooks/useForm";
import { getLoginMap } from "../../../maps/authMaps";

function Login() {
	const { form, handleChange, errors, isFormValid } = useForm({
		email: "",
		password: "",
	});

	const loginMap = getLoginMap(form, errors, handleChange);
	const loginInputs = loginMap.map((inputData) => {
		const { id, type, value, onChange, label, placeholder, name, error } =
			inputData;
		return (
			<div key={id}>
				<label>{label}</label>
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
				<span>{error && <p>{error.message}</p>}</span>
			</div>
		);
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid) return;
		console.log("Submitted form");
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* <div className="login_input">
				<label>Email</label>
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
				/>
				<span>{errors.email && <p>{errors.email.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Password</label>
				<input
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
				/>
				<span>{errors.password && errors.password.message}</span>
			</div> */}
			{loginInputs}
			<button type="submit" disabled={!isFormValid}>
				Login
			</button>
		</form>
	);
}

export default Login;
