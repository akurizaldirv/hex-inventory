import WithState from "../../../shared/hoc/WithState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBarangAction, selectedBarang, updateBarangAction } from "../slice/BarangSlice";

const schema = z.object({
	id: z.number(),
	nama: z.string().required({ message: "Hanya dapat menerima angka" }),
	status: z.boolean(),
});

const BarangForm = () => {
	const { barang } = useSelector((state) => state.barang);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm({ mode: "onChange", resolver: zodResolver(schema) });

	useEffect(() => {
		const id = barang ? barang.id : 0;
		setValue("id", id);
		if (barang) {
			setValue("nama", barang.nama);
			setValue("status", barang.status);
		}
	}, [barang, setValue]);

	useEffect(() => {
		if (!barang) {
			clearForm();
		}
	}, []);

	const onSubmit = (data) => {
		console.log(data);
		if (!isValid) return;
		if (data.id !== 0) {
			dispatch(updateBarangAction(data));
		} else {
			const barang = {
				...data,
				id: new Date().getMilliseconds(),
			};
			dispatch(addBarangAction(barang));
		}
		clearForm();
		navigate("/barang");
	};

	const clearForm = () => {
		const emptyForm = {
			id: 0,
			nama: "",
			status: false,
		};

		setValue("nama", emptyForm.nama);
		setValue("status", emptyForm.status);
		setValue("id", emptyForm.id);
		dispatch(selectedBarang(emptyForm));
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
						className={`form-control ${
							errors.nama && "is-invalid"
						}`}
						id="inputName"
						name="nama"
						{...register("nama")}
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
						onClick={() => navigate("/barang")}
					>
						Back
					</button>
				</div>
			</form>
		</div>
	);
};

const BarangFormWithState = WithState(BarangForm);
export default BarangFormWithState;
