import { IconAt, IconLock } from "@tabler/icons-react";
import foods from "../../assets/img/foods.png";
import WithState from "../../shared/hoc/WithState";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "./slice/AuthSlice";

const Login = () => {
	const [form, setForm] = useState({
		username: "",
		password: ""
	})
	const [error, setError] = useState({
		username: '',
		password: ''
	})
	const [isValid, setIsValid] = useState(false)

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newError = { ...error };
		if (name === "username") {
			newError.username = value.length === 0 ? "Username wajib diisi" : "";
		}
		if (name === "password") {
			if (value.length === 0) {
				newError.password = "Password wajib diisi";
			} else if (value.length <= 6) {
				newError.password = "Password minimal 6 karakter";
			} else {
				newError.password = "";
			}
		}

		setForm({
			...form,
			[name]: value
		})

		setError(newError)
		validateForm();
	};

	const validateForm = () => {
		const { username, password } = form;
		const isValid =
			username.trim() !== "" &&
			password.trim() !== "" &&
			Object.values(error).every((e) => e === "");

		setIsValid(isValid);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isValid) return;

		dispatch(login(form));
	};

	return (
		<>
			<div
				className="container py-5 d-flex align-items-center justify-content-center"
				style={{ minHeight: "100dvh" }}
			>
				<div
					className="login-form rounded-3 shadow mx-auto p-4 d-flex flex-column gap-2"
					style={{ maxWidth: "360px" }}
				>
					<div className="d-flex justify-content-center align-items-center">
						<img
							src={foods}
							alt="Login Image"
							className="w-75 my-3"
						/>
					</div>
					<div className="input-group">
						<span className="input-group-text">
							<IconAt />
						</span>
						<input
							type="text"
							className={`form-control ${
								error.username === ""
									? ""
									: "is-invalid"
							}`}
							id="input-username"
							name="username"
							placeholder="Input username"
							value={form.username}
							onChange={handleChange}
							onBlur={handleChange}
						/>
						{error.username && (
							<div className="invalid-feedback mb-2 fw-italic">
								{error.username}
							</div>
						)}
					</div>
					<div className="input-group">
						<span className="input-group-text">
							<IconLock />
						</span>
						<input
							type="password"
							className={`form-control ${
								error.password === ""
									? ""
									: "is-invalid"
							}`}
							id="input-password"
							placeholder="Input Password"
							name="password"
							value={form.password}
							onChange={handleChange}
							onBlur={handleChange}
						/>
						{error.password && (
							<div className="invalid-feedback ">
								{error.password}
							</div>
						)}
					</div>
					<button
						disabled={!isValid}
						type="submit"
						className="btn btn-primary text-white text-white w-100 mt-3"
						onClick={handleSubmit}
					>
						Login
					</button>
				</div>
			</div>
		</>
	);
}

const LoginComponent = WithState(Login);
export default LoginComponent;
