import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBarangAction, removeBarangAction, selectedBarang } from "../slice/BarangSlice";
import LoadingAnimation from "../../../shared/animation/LoadingAnimation";

const BarangList = () => {
	const { barangs, isLoading } = useSelector((state) => state.barang);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getBarangAction());
	}, [dispatch]);

	const handleClickEdit = (data) => {
		dispatch(selectedBarang(data))
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
				<h2 className="fs-4">Daftar Barang</h2>
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
					{barangs &&
						barangs.map((barang, idx) => {
							return (
								<tr key={barang.id}>
									<th scope="row">{idx + 1}</th>
									<td>{barang.nama}</td>
									<td>
										<span
											className={`badge text-white p-2 ${
												barang.status
													? "bg-secondary"
													: "bg-danger"
											}`}
										>
											{barang.status
												? "Tersedia"
												: "Tidak Tersedia"}
										</span>
									</td>
									<td>
										<button
											className="btn btn-primary text-light me-2"
											onClick={() => handleClickEdit(barang)}
										>
											Edit
										</button>
										<button
											className="btn btn-danger"
											onClick={() => 
												dispatch(
													removeBarangAction(barang.id)
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

export default BarangList;
