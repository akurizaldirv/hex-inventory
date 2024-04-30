import { Component } from "react";
import PropTypes from "prop-types";

import React from "react";
import { useState } from "react";
import { addMenuAction, selectedMenu } from "../slice/MenuSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MenuForm = () => {
	const [form, setForm] = useState({
		id: "",
		harga: 0,
		nama: "",
	});
	const [error, setError] = useState({
		id: "",
		harga: "",
		nama: "",
	});
	const [isValid, setIsValid] = useState(false);

	const { menu } = useSelector((state) => state.menu);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (menu) {
			setForm(menu);
		}
	}, [menu]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newError = { ...error };

		if (name === "nama") {
			newError.nama = value.length === 0 ? "Nama menu wajib diisi" : "";
		}

		if (name === "harga") {
			newError.harga = value.length === 0 ? "Harga menu wajib diisi" : "";
		}

		setForm({
			...form,
			[name]: value,
		});
		setError(newError);
		validateForm();
	};

	const validateForm = () => {
		const { nama, harga } = form;

		const isValid =
			nama.trim() !== "" &&
			harga !== 0 &&
			Object.values(error).every((e) => e === "");

		setIsValid(isValid);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isValid) return;

		const menu = {
			...form,
			id: new Date().getMilliseconds().toString(),
		};
		dispatch(addMenuAction(menu));
		clearForm();
		navigate("/menu");
	};

	const clearForm = () => {
		const emptyMenu = {
			id: "",
			harga: 0,
			nama: "",
		};

		// setForm(emptyMenu)
		dispatch(selectedMenu(emptyMenu));
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="inputName" className="form-label">
						Nama
					</label>
					<input
						type="text"
						className={`form-control ${
							error.nama === "" ? "" : "is-invalid"
						}`}
						id="inputName"
						name="nama"
						value={form.nama}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					{error.nama && (
						<div className="invalid-feedback ">
							{error.nama}
						</div>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="inputHarga" className="form-label">
						Harga
					</label>
					<input
						type="number"
						className={`form-control ${
							error.harga === "" ? "" : "is-invalid"
						}`}
						id="inputHarga"
						name="harga"
						pattern="[0-9\s]{13,19}"
						value={form.harga}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					{error.harga && (
						<div className="invalid-feedback ">
							{error.harga}
						</div>
					)}
				</div>
				<div className="d-flex gap-1">
					<button
						type="submit"
						className="btn btn-primary text-white"
						disabled={!isValid}
					>
						Simpan
					</button>
					<button type="reset" className="btn btn-danger">
						Reset
					</button>
					<button
						className="btn btn-secondary"
						onClick={() => navigate("/menu")}
					>
						Back
					</button>
				</div>
			</form>
		</div>
	);
};

export default MenuForm;
