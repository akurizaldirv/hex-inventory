import { Component } from "react";
import PropTypes from "prop-types";

export default class TableForm extends Component {
	state = {
		form: {
			id: "",
			nama: "",
            status: false
		},
		error: {
			id: "",
			nama: "",
		},
		isValid: false,
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		const error = { ...this.state.error };

		if (name === "nama") {
			error.nama = value.length === 0 ? "Nama menu wajib diisi" : "";
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

    handleChangeStatus = (event) => {
		this.setState({
			form: {
				...this.state.form,
				status: event.target.checked,
			},
		});
	};

	validateForm = () => {
		const { nama } = this.state.form;
		const { error } = this.state;
		const isValid =
			nama.trim() !== "" &&
			Object.values(error).every((e) => e === "");

		this.setState({ isValid });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.state.isValid) return;

		this.props.handleShowLoading();
		setTimeout(() => {
			const table = {
				...this.state.form,
				id: new Date().getMilliseconds().toString(),
			};

			this.props.saveTable(table);
			this.props.handleHideLoading();
		}, 300);
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="mb-3">
						<label htmlFor="inputName" className="form-label">
							Nama
						</label>
						<input
							type="text"
							className={`form-control ${
								this.state.error.nama === "" ? "" : "is-invalid"
							}`}
							id="inputName"
							name="nama"
							value={this.state.nama}
							onChange={this.handleChange}
							onBlur={this.handleChange}
						/>
						{this.state.error.nama && (
							<div className="invalid-feedback ">
								{this.state.error.nama}
							</div>
						)}
					</div>                    
						<div className="form-check my-3  d-flex gap-2">
							<input
								type="checkbox"
								name="status"
								id="status"
								className="form-check-input"
								onChange={this.handleChangeStatus}
								checked={this.state.form.status}
							/>
							<label htmlFor="status">Tersedia</label>
						</div>
					<div className="d-flex gap-3">
						<button
							type="submit"
							className="btn btn-primary text-white"
							disabled={!this.state.isValid}
						>
							Simpan
						</button>
						<button type="reset" className="btn btn-danger">
							Reset
						</button>
					</div>
				</form>
			</div>
		);
	}
}

TableForm.propTypes = {
	saveTable: PropTypes.func.isRequired,
	handleShowLoading: PropTypes.func.isRequired,
	handleHideLoading: PropTypes.func.isRequired,
};
