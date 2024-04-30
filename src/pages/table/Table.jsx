import WithState from "../../shared/hoc/WithState";
import { Outlet } from "react-router-dom";

const Table = () => {
	return (
		<>
			<div
				className=" rounded-4 px-4 py-2"
				style={{ marginRight: "2vh", marginBottom: "2vh" }}
			>
				<h1 className="fs-2">Meja</h1>
				<Outlet />
			</div>
		</>
	);
};

// class Table extends Component {
// 	state = {
// 		tables: [],
// 	};

// 	componentDidMount() {
// 		this.setState({
// 			tables: this.props.tables,
// 		});
// 	}

// 	saveTable = (menu) => {
// 		this.props.tableControl.save(menu);
// 		this.setState({
// 			tables: this.props.tables,
// 		});
// 	};

// 	deleteTable = (id) => {
// 		this.props.tableControl.delete(id);
// 		const tables = this.state.tables.filter((menu) => menu.id !== id);
// 		this.setState({
// 			tables: tables,
// 		});
// 	};

// 	render() {

// 	}
// }

// Table.propTypes = {
// 	tables: PropTypes.array.isRequired,
// 	tableControl: PropTypes.object.isRequired,
// 	handleShowLoading: PropTypes.func.isRequired,
// 	handleHideLoading: PropTypes.func.isRequired,
// 	isLoading: PropTypes.bool.isRequired,
// };

const TableApp = WithState(Table);
export default TableApp;
