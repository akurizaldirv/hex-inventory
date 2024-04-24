import { Component } from "react";
import PropTypes from "prop-types";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { IconSoup } from "@tabler/icons-react";
import { IconPlayerStop } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";

export default class Sidebar extends Component {
	render() {
		const { navigateTo } = this.props;

		return (
			<div
				className="text-white fixed top-0 left-0"
				style={{ width: 300, height: "100%", marginRight: "2vh" }}
			>
				<div
					className="bg-primary p-3 shadow rounded-4"
					style={{ height: "96vh" }}
				>
					<div className="font-logo text-center mb-5">
						<h1 className="fs-2 mb-0 fw-light">
							<span className="fw-bold  fst-italic">WMB</span>
						</h1>
						<p className="mt-0">Warung Makan Bakari</p>
                        <hr />
					</div>
					<nav>
						<ul className="d-flex flex-column gap-3 nav-list btn-toggle-nav list-unstyled">
							<div>
								<p className="fw-bold mb-0">Dashboard</p>
								<li
									className="cursor-pointer text-white btn text-start w-100"
									onClick={() => navigateTo(<UserApp />)}
								>
									<i className="me-3">
										<IconLayoutDashboard />
									</i>
									<span>Dashboard</span>
								</li>
							</div>
							<div>
                                <hr />
								<p className="fw-bold mb-0">Management</p>
								<li
									className="cursor-pointer text-white btn text-start w-100"
									onClick={() => navigateTo(<UserApp />)}
								>
									<i className="me-3">
										<IconSoup />
									</i>
									<span>Menu</span>
								</li>
								<li
									className="cursor-pointer text-white btn text-start w-100"
									onClick={() => navigateTo(<UserApp />)}
								>
									<i className="me-3">
										<IconPlayerStop />
									</i>
									<span>Table</span>
								</li>
							</div>
							<div>
                                <hr />
								<li
									className="cursor-pointer text-white btn text-start w-100"
									onClick={this.props.handleLogout}
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
	}
}

Sidebar.propTypes = {
	navigateTo: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
};
