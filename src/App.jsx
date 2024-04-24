import { Component } from "react";
import PropTypes from "prop-types";
import WithState from "./shared/hoc/WithState";
import Login from "./pages/authentication/Login";

class App extends Component {
	state = {    
    menus: [],
    tables: [],
		isAuthenticated: false,
    page: <Login />
	};

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
			this.props.handleShowToast("Sukses login");
		} else {
			this.props.handleShowToast("Sukses logout");
		}
	};
	render() {
		return (
			<>
      {this.state.isAuthenticated ? (
					<div className="d-flex">
					{/* <Sidebar navigateTo={this.navigateTo} handleAuthentication={this.handleAuthentication} /> */}
					<main className="w-100 felx-grow-1">
						{/* <Header handleAuthentication={this.handleAuthentication} navigateTo={this.navigateTo} />
						{this.state.page} */}
					</main>
				</div>
				) : (
					<Login handleAuthentication={this.handleAuthentication} />
				)}
				
			</>
		);
	}
}

App.propTypes = {
	handleShowToast: PropTypes.func.isRequired,
};

const AppComponent = WithState(App);
export default AppComponent;
