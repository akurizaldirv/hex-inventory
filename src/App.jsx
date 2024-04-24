import { Component } from "react";
import PropTypes from "prop-types";
import WithState from "./shared/hoc/WithState";

class App extends Component {
	state = {    
    menus: [],
    tables: [],
		isAuthenticated: false,
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
				<div className="vh-100 bg-danger">Warung Makan Bahari</div>
			</>
		);
	}
}

App.propTypes = {
	handleShowToast: PropTypes.func.isRequired,
};

const AppComponent = WithState(App);
export default AppComponent;
