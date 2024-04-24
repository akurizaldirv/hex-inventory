import { Component } from "react";
import PropTypes from "prop-types";

export default class MenuList extends Component {
	handleDelete = (id) => {
		this.props.handleShowLoading();
		setTimeout(() => {
			this.props.deleteMenu(id);
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
						{this.props.menus.map((menu, idx) => {
							return (
								<tr key={menu.id}>
									<th scope="row">{idx + 1}</th>
									<td>{menu.nama}</td>
									<td>Rp. {new Intl.NumberFormat('en-DE').format(menu.harga)}</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={() =>
												this.handleDelete(menu.id)
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

MenuList.propTypes = {
	menus: PropTypes.array.isRequired,
	deleteMenu: PropTypes.func.isRequired,
    handleShowLoading: PropTypes.func.isRequired,
    handleHideLoading: PropTypes.func.isRequired,
};
