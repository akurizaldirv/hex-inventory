import { Component } from "react";
import { IconAt, IconLock } from "@tabler/icons-react";
import foods from "../../assets/img/foods.png";
import WithState from "../../shared/hoc/WithState";
import PropTypes from "prop-types";

class Login extends Component {
	state = {
		form: {
			username: "",
			password: "",
		},
		error: {
			username: "",
			password: "",
		},
		isValid: false,
	};

	handleChange = (e) => {
		const { name, value } = e.target;

		let error = { ...this.state.error };
		if (name === "username") {
			error.username = value.length === 0 ? "Username wajib diisi" : "";
		}
		if (name === "password") {
			if (value.length === 0) {
				error.password = "Password wajib diisi";
			} else if (value.length <= 6) {
				error.password = "Password minimal 6 karakter";
			} else {
				error.password = "";
			}
		}

		this.setState({
			form: {
				...this.state.form,
				[name]: value,
			},
			error,
		});
		this.validateForm();
	};

	validateForm = () => {
		const { username, password } = this.state.form;
		const { error } = this.state;
		const isValid =
			username.trim() !== "" &&
			password.trim() !== "" &&
			Object.values(error).every((e) => e === "");

		this.setState({ isValid });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = this.state.form;
		if (!this.state.isValid) return;

		if (
			username === this.props.loginData.username &&
			password === this.props.loginData.password
		) {
			this.props.handleAuthentication(true);
		} else {
			this.props.handleShowToast("Username/Password salah", "danger");
		}
	};

	render() {
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
									this.state.error.username === ""
										? ""
										: "is-invalid"
								}`}
								id="input-username"
								name="username"
								placeholder="Input username"
								value={this.state.form.username}
								onChange={this.handleChange}
								onBlur={this.handleChange}
							/>
							{this.state.error.username && (
								<div className="invalid-feedback mb-2 fw-italic">
									{this.state.error.username}
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
									this.state.error.password === ""
										? ""
										: "is-invalid"
								}`}
								id="input-password"
								placeholder="Input Password"
								name="password"
								value={this.state.form.password}
								onChange={this.handleChange}
								onBlur={this.handleChange}
							/>
							{this.state.error.password && (
								<div className="invalid-feedback ">
									{this.state.error.password}
								</div>
							)}
						</div>
						<button
							disabled={!this.state.isValid}
							type="submit"
							className="btn btn-primary text-white w-100 mt-3"
							onClick={this.handleSubmit}
						>
							Login
						</button>
					</div>
				</div>
			</>
		);
	}
}

Login.propTypes = {
	loginData: PropTypes.object.isRequired,
	handleShowToast: PropTypes.func.isRequired,
	handleAuthentication: PropTypes.func.isRequired,
};

const LoginComponent = WithState(Login);
export default LoginComponent;
