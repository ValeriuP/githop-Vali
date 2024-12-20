import { useForm } from "../../../customHooks/useForm";

function Register() {
	const { form, handleChange, errors, isFormValid } = useForm({
		email: "",
		firstName: "",
		lastName: "",
		age: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid) return;
		console.log("Submitted form");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="login_input">
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
				<label>First Name</label>
				<input
					type="text"
					name="firstName"
					value={form.firstName}
					onChange={handleChange}
				/>
				<span>{errors.firstName && <p>{errors.firstName.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Last Name</label>
				<input
					type="text"
					name="lastName"
					value={form.lastName}
					onChange={handleChange}
				/>
				<span>{errors.lastName && <p>{errors.lastName.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Age</label>
				<input
					type="text"
					name="age"
					value={form.age}
					onChange={handleChange}
				/>
				<span>{errors.age && <p>{errors.age.message}</p>}</span>
			</div>
			<div className="login_input">
				<label>Password</label>
				<input
					type="text"
					name="password"
					value={form.password}
					onChange={handleChange}
				/>
				<span>{errors.password && errors.password.message}</span>
			</div>
			<div className="login_input">
				<label>Confirm Password</label>
				<input
					type="text"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
				/>
				<span>
					{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
				</span>
			</div>
			<button type="submit" disabled={!isFormValid}>
				Sign up
			</button>
		</form>
	);
}

export default Register;
