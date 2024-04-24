import { Component } from "react";
import PropTypes from "prop-types";
import WithState from "../../shared/hoc/WithState";
import MenuForm from "./components/MenuForm";
import MenuList from "./components/MenuList";
import LoadingAnimation from "../../shared/animation/LoadingAnimation";
class Menu extends Component {
	state = {
		menus: this.props.menus,
	};

	saveMenu = (menu) => {
		this.props.menuControl.save(menu);
		this.setState({
			menus: this.props.menus,
		});
	};

	deleteMenu = (id) => {
		this.props.menuControl.delete(id);
        const menus = this.state.menus.filter(menu => menu.id !== id);
		this.setState({
			menus: menus,
		});
	};

	render() {
		return (
			<>
				<div
					className=" rounded-4 px-4 py-2"
					style={{ marginRight: "2vh", marginBottom: "2vh" }}
				>
					<h1 className="fs-2">Menu</h1>
					<div>
						<MenuForm
							saveMenu={this.saveMenu}
							handleShowLoading={this.props.handleShowLoading}
							handleHideLoading={this.props.handleHideLoading}
                            />

						<h2 className="fs-4 mt-5">Daftar Menu</h2>
						{this.props.isLoading ? (
                            <LoadingAnimation />
						) : (
                            <MenuList
                            menus={this.state.menus}
                            deleteMenu={this.deleteMenu}
                            handleShowLoading={this.props.handleShowLoading}
                            handleHideLoading={this.props.handleHideLoading}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
}

Menu.propTypes = {
	menus: PropTypes.array.isRequired,
	menuControl: PropTypes.object.isRequired,
	handleShowLoading: PropTypes.func.isRequired,
	handleHideLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

const MenuApp = WithState(Menu);
export default MenuApp;
