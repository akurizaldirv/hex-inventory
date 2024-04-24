import { Component } from "react";
import PropTypes from "prop-types";

export default class TableList extends Component {
	handleDelete = (id) => {
		this.props.handleShowLoading();
		setTimeout(() => {
			this.props.deleteTable(id);
			this.props.handleHideLoading();
		}, 3000);
	};

	render() {
		return (
			<div>
				<table className="table table-striped">
					<thead>
						<tr className="fw-semibold">
							<th scope="col">No.</th>
							<th scope="col">Nama</th>
							<th scope="col">Harga</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.tables.map((table, idx) => {
							return (
								<tr key={table.id}>
									<th scope="row">{idx + 1}</th>
									<td>{table.nama}</td>
									<td>
										<span
											className={`badge text-white p-2 ${
												table.status
													? "bg-primary"
													: "bg-danger"
											}`}
										>
											{table.status
												? "Tersedia"
												: "Tidak Tersedia"}
										</span>
									</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() =>
												this.handleDelete(table.id)
											}
										>
											Hapus
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

TableList.propTypes = {
	tables: PropTypes.array.isRequired,
	deleteTable: PropTypes.func.isRequired,
	handleShowLoading: PropTypes.func.isRequired,
	handleHideLoading: PropTypes.func.isRequired,
};
