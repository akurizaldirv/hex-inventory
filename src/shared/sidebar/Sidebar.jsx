import { IconLayoutDashboard } from "@tabler/icons-react";
import { IconSoup } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../pages/authentication/slice/AuthSlice";

const Sidebar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div
			className="text-white fixed top-0 left-0"
			style={{ width: 300, height: "100%", marginRight: "2vh" }}
		>
			<div
				className="bg-primary p-3 shadow rounded-4"
				style={{ height: "96vh" }}
			>
				<div
					className="font-logo text-center mb-5 btn text-white w-100"
					onClick={() => navigate("/")}
				>
					<h1 className="fs-2 mb-0 fw-light">
						<span className="fw-bold  fst-italic">WMB</span>
					</h1>
					<p className="mt-0">Warung Makan Bakari</p>
					{/* <hr /> */}
				</div>
				<nav>
					<ul className="d-flex flex-column gap-3 nav-list btn-toggle-nav list-unstyled">
						<div>
							<hr />
							<p className="fw-bold mb-0">Management</p>
							<li
								className="cursor-pointer text-white btn text-start w-100"
								onClick={() => navigate("/menu")}
							>
								<i className="me-3">
									<IconSoup />
								</i>
								<span>Menu</span>
							</li>
							<li
								className="cursor-pointer text-white btn text-start w-100"
								onClick={() => navigate("/table")}
							>
								<i className="me-3">
									<IconLayoutDashboard />
								</i>
								<span>Table</span>
							</li>
						</div>
						<div>
							<hr />
							<li
								className="cursor-pointer text-white btn text-start w-100"
								onClick={() => dispatch(logoutAction())}
							>
								<i className="me-3">
									<IconLogout />
								</i>
								<span>Logout</span>
							</li>
						</div>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
