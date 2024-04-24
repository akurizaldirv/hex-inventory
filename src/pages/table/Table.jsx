import { Component } from "react";
import PropTypes from "prop-types";
import WithState from "../../shared/hoc/WithState";
import LoadingAnimation from "../../shared/animation/LoadingAnimation";
import TableForm from "./components/TableForm";
import TableList from "./components/TableList";

class Table extends Component {
	state = {
		tables: [],
	};

	componentDidMount() {
		this.setState({
			tables: this.props.tables,
		});
	}

	saveTable = (menu) => {
		this.props.tableControl.save(menu);
		this.setState({
			tables: this.props.tables,
		});
	};

	deleteTable = (id) => {
		this.props.tableControl.delete(id);
		const tables = this.state.tables.filter((menu) => menu.id !== id);
		this.setState({
			tables: tables,
		});
	};

	render() {
		return (
			<>
				<div
					className=" rounded-4 px-4 py-2"
					style={{ marginRight: "2vh", marginBottom: "2vh" }}
				>
					<h1 className="fs-2">Meja</h1>
					<div>
						<TableForm
							saveTable={this.saveTable}
							handleShowLoading={this.props.handleShowLoading}
							handleHideLoading={this.props.handleHideLoading}
						/>

						<h2 className="fs-4 mt-5">Daftar Meja</h2>
						{this.props.isLoading ? (
							<LoadingAnimation />
						) : (
							<TableList
								tables={this.state.tables}
								deleteTable={this.deleteTable}
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

Table.propTypes = {
	tables: PropTypes.array.isRequired,
	tableControl: PropTypes.object.isRequired,
	handleShowLoading: PropTypes.func.isRequired,
	handleHideLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

const TableApp = WithState(Table);
export default TableApp;
