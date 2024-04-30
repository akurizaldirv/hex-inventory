import Sidebar from "../sidebar/Sidebar";
import HeaderApp from "../header/Header";
import LoginComponent from "../../pages/authentication/Login";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import WithState from "../hoc/WithState";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../pages/authentication/slice/AuthSlice";
import PropTypes from "prop-types";
import CommonLoading from "../animation/CommonLoading";

const Layout = (props) => {
	const { userInfo } = useSelector((state) => state.auth);
	const { notification, isLoading } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const handleShowToast = props.handleShowToast;

	useEffect(() => {
		if (notification.message) {
			handleShowToast(notification.message, notification.color);
			dispatch(clearMessage());
		}
	}, [notification, dispatch, handleShowToast]);

	if (isLoading) {
		return <CommonLoading />;
	}

	return (
		<>
			{userInfo.username ? (
				<div style={{ margin: "2vh" }}>
					<div className="d-flex">
						<Sidebar />
						<main className="w-100 flex-grow-1">
							<HeaderApp />
							<Outlet />
						</main>
					</div>
				</div>
			) : (
				<LoginComponent />
			)}
		</>
	);
};

Layout.propTypes = {
	handleShowToast: PropTypes.func.isRequired,
};

const LayoutState = WithState(Layout);
export default LayoutState;
