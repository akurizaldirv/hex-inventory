import { useState } from "react";
import WithState from "../../../shared/hoc/WithState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTableAction, selectedTable } from "../slice/TableSlice";
import { useNavigate } from "react-router-dom";

const TableForm = () => {
	const [form, setForm] = useState({
		id: "",
		nama: "",
		status: false,
	});
	const [error, setError] = useState({
		id: "",
		nama: "",
	});
	const [isValid, setIsValid] = useState(false);

	const { table } = useSelector((state) => state.table);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (table) {
			setForm(table);
		}
	}, [table]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newError = { ...error };

		if (name === "nama") {
			newError.nama = value.length === 0 ? "Nama menu wajib diisi" : "";
		}

		setForm({
			...form,
			[name]: value,
		});
		setError(newError);

		validateForm();
	};

	const handleChangeStatus = (event) => {
		setForm({
			...form,
			status: event.target.checked,
		});
	};

	const validateForm = () => {
		const { nama } = form;
		const isValid =
			nama.trim() !== "" && Object.values(error).every((e) => e === "");

		setIsValid(isValid);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isValid) return;

		const table = {
			...form,
			id: new Date().getMilliseconds().toString(),
		};
		dispatch(addTableAction(table));

		clearForm();
		navigate("/table");
	};

	const clearForm = () => {
		const emptyForm = {
			id: "",
			nama: "",
			status: false,
		};

		dispatch(selectedTable(emptyForm));
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
						<div className="invalid-feedback ">{error.nama}</div>
					)}
				</div>
				<div className="form-check my-3  d-flex gap-2">
					<input
						type="checkbox"
						name="status"
						id="status"
						className="form-check-input"
						onChange={handleChangeStatus}
						checked={form.status}
					/>
					<label htmlFor="status">Tersedia</label>
				</div>
				<div className="d-flex gap-3">
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
