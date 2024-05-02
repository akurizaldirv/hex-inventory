import { useState } from "react";
import WithState from "../../../shared/hoc/WithState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
	addTableAction,
	selectedTable,
	updateTableAction,
} from "../slice/TableSlice";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	id: z.number(),
	nama: z.number().min(1, { message: "Hanya dapat menerima angka" }),
	status: z.boolean(),
});

const TableForm = () => {
	const { table } = useSelector((state) => state.table);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm({ mode: "onChange", resolver: zodResolver(schema) });

	useEffect(() => {
		const id = table ? table.id : 0;
		setValue("id", id);
		if (table) {
			setValue("nama", table.nama);
			setValue("status", table.status);
		}
	}, [table, setValue]);

	useEffect(() => {
		if (!table) {
			clearForm();
		}
	}, []);

	const onSubmit = (data) => {
		console.log(data);
		if (!isValid) return;
		if (data.id !== 0) {
			dispatch(updateTableAction(data));
		} else {
			const menu = {
				...data,
				id: new Date().getMilliseconds(),
			};
			dispatch(addTableAction(menu));
		}
		clearForm();
		navigate("/table");
	};

	const clearForm = () => {
		const emptyForm = {
			id: 0,
			nama: 0,
			status: false,
		};

		setValue("nama", emptyForm.nama);
		setValue("status", emptyForm.status);
		setValue("id", emptyForm.id);
		dispatch(selectedTable(emptyForm));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="hidden"
					{...register("id", { valueAsNumber: true })}
				/>
				<div className="mb-3">
					<label htmlFor="inputName" className="form-label">
						Nama
					</label>
					<input
						type="number"
						className={`form-control ${
							errors.nama && "is-invalid"
						}`}
						id="inputName"
						name="nama"
						{...register("nama", { valueAsNumber: true })}
					/>
					{errors.nama && (
						<div className="invalid-feedback ">{errors.nama}</div>
					)}
				</div>
				<div className="form-check my-3  d-flex gap-2">
					<input
						type="checkbox"
						name="status"
						id="status"
						className="form-check-input"
						{...register("status")}
					/>
					<label htmlFor="status">Tersedia</label>
				</div>
				<div className="d-flex gap-3">
					<button
						type="submit"
						className="btn btn-primary text-light"
						disabled={!isValid}
					>
						Simpan
					</button>
					<button type="reset" className="btn btn-danger">
						Reset
					</button>
					<button
						className="btn btn-secondary text-light"
						onClick={() => navigate("/table")}
					>
						Back
					</button>
				</div>
			</form>
		</div>
	);
};

const TableFormWithState = WithState(TableForm);
export default TableFormWithState;
