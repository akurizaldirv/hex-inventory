import { Component } from "react";
import PropTypes from "prop-types";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { IconSoup } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";
import MenuApp from "../../pages/menu/Menu";
import TableApp from "../../pages/table/Table";
import Dashboard from "../../pages/dashboard/Dashboard";

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
					<div className="font-logo text-center mb-5 btn text-white w-100"
                    onClick={() => navigateTo(<Dashboard menus={this.props.menus} tables={this.props.tables} />)}>
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
									onClick={() => navigateTo(<MenuApp menus={this.props.menus} menuControl={this.props.menuControl}/>)}
								>
									<i className="me-3">
										<IconSoup />
									</i>
									<span>Menu</span>
								</li>
								<li
									className="cursor-pointer text-white btn text-start w-100"
									onClick={() => navigateTo(<TableApp tables={this.props.tables} tableControl={this.props.tableControl} />)}
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
    menus: PropTypes.array.isRequired,
    tables: PropTypes.array.isRequired,
    menuControl: PropTypes.object.isRequired,
    tableControl: PropTypes.object.isRequired,
};
