import WithState from "../../shared/hoc/WithState";
import { Outlet } from "react-router-dom";

const Table = () => {
	return (
		<>
			<div
				className=" rounded-4 px-4 py-2"
				style={{ marginRight: "2vh", marginBottom: "2vh" }}
			>
				<h1 className="fs-2">Meja</h1>
				<Outlet />
			</div>
		</>
	);
};

const TableApp = WithState(Table);
export default TableApp;
