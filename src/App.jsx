import { Component } from "react";
import PropTypes from "prop-types";
import WithState from "./shared/hoc/WithState";
import Login from "./pages/authentication/Login";
import Sidebar from "./shared/sidebar/Sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import HeaderApp from "./shared/header/Header";

class App extends Component {
	state = {
		menus: [
			{
				id: 378,
				nama: "nasi campur",
				harga: 40000,
			},
		],
		tables: [],
		loginData: {
			username: "admin",
			password: "12345678",
		},
		isAuthenticated: true,
		page: <Dashboard />,
	};

	saveMenu = (menu) => {
		const menus = this.state.menus;
		menus.push(menu);

		this.setState({
			menus: menus,
		});
	};

  deleteMenu = (id) => {
    const menus = this.state.menus.filter(menu => menu.id !== id);
    console.log(menus);

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
		const menuControl = {
			save: this.saveMenu,
      delete: this.deleteMenu
		};

		return (
			<div style={{ margin: "2vh" }}>
				{this.state.isAuthenticated ? (
					<div className="d-flex">
						<Sidebar
							navigateTo={this.navigateTo}
							handleAuthentication={this.handleAuthentication}
							handleLogout={this.handleLogout}
							menus={this.state.menus}
							tables={this.state.tables}
							menuControl={menuControl}
						/>
						<main className="w-100 flex-grow-1">
							<HeaderApp
								handleAuthentication={this.handleAuthentication}
								navigateTo={this.navigateTo}
								username={this.state.loginData.username}
								handleLogout={this.handleLogout}
							/>
							{this.state.page}
						</main>
					</div>
				) : (
					<Login
						handleAuthentication={this.handleAuthentication}
						loginData={this.state.loginData}
					/>
				)}
			</div>
		);
	}
}

App.propTypes = {
	handleShowToast: PropTypes.func.isRequired,
};

const AppComponent = WithState(App);
export default AppComponent;
