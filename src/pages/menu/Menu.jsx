import { Outlet } from "react-router-dom";

const Menu = () => {
	return (
		<>
			<div
				className=" rounded-4 px-4 py-2"
				style={{ marginRight: "2vh", marginBottom: "2vh" }}
			>
				<h1 className="fs-2">Menu</h1>
				<Outlet />
			</div>
		</>
	);
}

export default Menu