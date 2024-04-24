import { Component } from "react";
import PropTypes from "prop-types";

export default class MenuForm extends Component {
	state = {
		form: {
			id: "",
			harga: 0,
			nama: "",
		},
		error: {
			id: "",
			harga: "",
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

		if (name === "harga") {
			error.harga = value.length === 0 ? "Harga menu wajib diisi" : "";
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
		const { nama, harga } = this.state.form;
		const { error } = this.state;
		const isValid =
			nama.trim() !== "" &&
			harga !== 0 &&
			Object.values(error).every((e) => e === "");

		this.setState({ isValid });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.state.isValid) return;

		this.props.handleShowLoading();
		setTimeout(() => {
			const menu = {
				...this.state.form,
				id: new Date().getMilliseconds().toString(),
			};

			this.props.saveMenu(menu);
			this.props.handleHideLoading();
		}, 3000);
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
					<div className="mb-3">
						<label htmlFor="inputHarga" className="form-label">
							Harga
						</label>
						<input
							type="number"
							className={`form-control ${
								this.state.error.harga === ""
									? ""
									: "is-invalid"
							}`}
							id="inputHarga"
							name="harga"
							pattern="[0-9\s]{13,19}"
							value={this.state.harga}
							onChange={this.handleChange}
							onBlur={this.handleChange}
						/>
						{this.state.error.harga && (
							<div className="invalid-feedback ">
								{this.state.error.harga}
							</div>
						)}
					</div>
					<div className="d-flex gap-1">
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

MenuForm.propTypes = {
	saveMenu: PropTypes.func.isRequired,
	handleShowLoading: PropTypes.func.isRequired,
	handleHideLoading: PropTypes.func.isRequired,
};
