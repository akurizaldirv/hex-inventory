import { Component } from "react";
import PropTypes from "prop-types";
import WithState from "./shared/hoc/WithState";
import Dashboard from "./pages/dashboard/Dashboard";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";

class App extends Component {
	state = {
		menus: [],
		tables: [],
		loginData: {
			username: "admin",
			password: "12345678",
		},
		isAuthenticated: true,
		page: <Dashboard />,
	};

	saveTable = (table) => {
		const tables = this.state.tables;
		tables.push(table);

		this.setState({
			tables: tables,
		});
	};

	deleteTable = (id) => {
		const tables = this.state.tables.filter(table => table.id !== id);

		this.setState({
			tables: tables
		})
	}

	saveMenu = (menu) => {
		const menus = this.state.menus;
		menus.push(menu);

		this.setState({
			menus: menus,
		});
	};

	deleteMenu = (id) => {
		const menus = this.state.menus.filter(menu => menu.id !== id);

		this.setState({
			menus: menus
		})
	}

	navigateTo = (component) => {
		this.setState({
			page: component,
		});
	};

	handleAuthentication = (status) => {
		this.setState({
			isAuthenticated: status,
		});

		if (status) {
			this.props.handleShowToast("Berhasil Masuk");
		} else {
			this.props.handleShowToast("Berhasil Keluar");
		}
	};

	handleLogout = () => {
		if (!confirm("Apakah yakin ingin logout?")) return;
		this.handleAuthentication(false);
	};

	render() {
		// 	const menuControl = {
		// 		save: this.saveMenu,
		//   delete: this.deleteMenu
		// 	};

		// const tableControl = {
		// 		save: this.saveTable,
		//   delete: this.deleteTable
		// 	};

		return (
			<RouterProvider router={Routes} />
		)
	}
}

App.propTypes = {
	handleShowToast: PropTypes.func.isRequired,
};

const AppComponent = WithState(App);
export default AppComponent;
