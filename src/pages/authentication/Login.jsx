import { IconAt, IconLock } from "@tabler/icons-react";
import foods from "../../assets/img/foods.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginAction } from "./slice/AuthSlice";
import "../../App.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	username: z.string().min(1, { message: "Username harus terisi" }),
	password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const Login = () => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: "onChange", resolver: zodResolver(schema) });

	const onSubmit = (data) => {
		if (!isValid) return;

		dispatch(loginAction(data));
	};

	return (
		<>
			<div
				className="d-flex align-items-center justify-content-center background"
				style={{ minHeight: "100dvh" }}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div
						className="login-form rounded-3 shadow mx-auto p-4 d-flex flex-column gap-2 white-blur"
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
									errors.username && "is-invalid"
								}`}
								id="input-username"
								name="username"
								placeholder="Input username"
								{...register("username")}
							/>
							{errors.username && (
								<div className="invalid-feedback mb-2 fst-italic text-end">
									{errors.username.message}
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
									errors.password && "is-invalid"
								}`}
								id="input-password"
								placeholder="Input Password"
								name="password"
								{...register("password")}
							/>
							{errors.password && (
								<div className="invalid-feedback fst-italic text-end">
									{errors.password.message}
								</div>
							)}
						</div>
						<button
							disabled={!isValid}
							type="submit"
							className="btn btn-primary text-white text-white w-100 mt-3"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
