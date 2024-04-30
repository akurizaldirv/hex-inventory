import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
	getMenuAction,
	removeMenuAction,
	selectedMenu,
} from "../slice/MenuSlice";
import LoadingAnimation from "../../../shared/animation/LoadingAnimation";
import { useSelector } from "react-redux";

const MenuList = () => {
	const { menus, isLoading } = useSelector((state) => state.menu);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getMenuAction());
	}, [dispatch]);

	const handleClickEdit = (data) => {
		dispatch(selectedMenu(data));
		navigate("form");
	};

	if (isLoading) {
		return (
			<div>
				<LoadingAnimation />
			</div>
		);
	}

	return (
		<div>
			<div className="d-flex mt-5 justify-content-between">
				<h2 className="fs-4">Daftar Menu</h2>
				<button
					className="btn btn-secondary text-light"
					onClick={() => navigate("form")}
				>
					Tambah
				</button>
			</div>
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
					{menus &&
						menus.map((menu, idx) => {
							return (
								<tr key={menu.id}>
									<th scope="row">{idx + 1}</th>
									<td>{menu.nama}</td>
									<td>
										Rp.{" "}
										{new Intl.NumberFormat("en-DE").format(
											menu.harga
										)}
									</td>
									<td>
										<button
											className="btn btn-primary text-light me-2"
											onClick={() =>
												handleClickEdit(menu)
											}
										>
											Edit
										</button>
										<button
											className="btn btn-danger"
											onClick={() =>
												dispatch(
													removeMenuAction(menu.id)
												)
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
};

export default MenuList;
