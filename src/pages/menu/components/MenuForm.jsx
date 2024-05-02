import { useState } from "react";
import {
	addMenuAction,
	selectedMenu,
	updateMenuAction,
} from "../slice/MenuSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	id: z.number(),
	nama: z.string().min(1, { message: "Nama menu harus terisi" }),
	harga: z.number().min(500, { message: "Harga minimal 500" }),
});

const MenuForm = () => {
	const { menu } = useSelector((state) => state.menu);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm({ mode: "onChange", resolver: zodResolver(schema) });

	useEffect(() => {
		const id = menu ? menu.id : 0
		setValue("id", id)
		if (menu) {
			setValue("nama", menu.nama);
			setValue("harga", menu.harga);
		}
	}, [menu, setValue]);

	useEffect(() => {
		if (!menu) {
			clearForm()
		}
	}, [])

	const onSubmit = (data) => {
		console.log(data);
		if (!isValid) return;
		if (data.id !== 0) {
			dispatch(updateMenuAction(data));
		} else {
			const menu = {
				...data,
				id: new Date().getMilliseconds(),
			};
			dispatch(addMenuAction(menu));
		}
		clearForm();
		navigate("/menu");
	};

	const clearForm = () => {
		const emptyMenu = {
			id: 0,
			harga: 0,
			nama: "",
		};

		setValue("nama", emptyMenu.nama)
		setValue("harga", emptyMenu.harga)
		setValue("id", emptyMenu.id)
		dispatch(selectedMenu(emptyMenu));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<input type="hidden" {...register("id", {valueAsNumber: true})} />
					<label htmlFor="inputName" className="form-label">
						Nama
					</label>
					<input
						type="text"
						className={`form-control ${
							errors.nama && "is-invalid"
						}`}
						id="inputName"
						name="nama"
						{...register("nama")}
						// value={form.nama}
						// onChange={handleChange}
						// onBlur={handleChange}
					/>
					{errors.nama && (
						<div className="invalid-feedback ">
							{errors.nama.message}
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
							errors.harga && "is-invalid"
						}`}
						id="inputHarga"
						name="harga"
						// pattern="[0-9\s]{13,19}"
						{...register("harga", { valueAsNumber: true })}
						// value={form.harga !== 0 && form.harga}
						// onChange={handleChange}
						// onBlur={handleChange}
					/>
					{errors.harga && (
						<div className="invalid-feedback ">
							{errors.harga.message}
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
						className="btn btn-secondary text-light"
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
