import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTableAction, removeTableAction, selectedTable } from "../slice/TableSlice";
import LoadingAnimation from "../../../shared/animation/LoadingAnimation";

const TableList = () => {
	const { tables, isLoading } = useSelector((state) => state.table);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getTableAction());
	}, [dispatch]);

	const handleClickEdit = (data) => {
		dispatch(selectedTable(data))
		navigate("form")
	}


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
				<h2 className="fs-4">Daftar Meja</h2>
				<button
					onClick={() => navigate("form")}
					className="btn btn-primary text-light"
				>
					Tambah
				</button>
			</div>
			<table className="table table-striped">
				<thead>
					<tr className="fw-semibold">
						<th scope="col">No.</th>
						<th scope="col">Nama</th>
						<th scope="col">Status</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{tables &&
						tables.map((table, idx) => {
							return (
								<tr key={table.id}>
									<th scope="row">{idx + 1}</th>
									<td>{table.nama}</td>
									<td>
										<span
											className={`badge text-white p-2 ${
												table.status
													? "bg-secondary"
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
											className="btn btn-primary text-light me-2"
											onClick={() => handleClickEdit(table)}
										>
											Edit
										</button>
										<button
											className="btn btn-danger"
											onClick={() => 
												dispatch(
													removeTableAction(table.id)
												)}
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

export default TableList;
