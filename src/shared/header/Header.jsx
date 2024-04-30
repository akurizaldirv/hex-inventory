import { IconLogout } from "@tabler/icons-react";
import WithState from "../hoc/WithState";
import ava from "../../assets/img/ava.png"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../pages/authentication/slice/AuthSlice";

const Header = () => {
	const {userInfo} = useSelector(state => state.auth);
	const dispatch = useDispatch()

	return (
		<div className="d-flex justify-content-between bg-primary rounded-4 px-4 py-2" style={{marginBottom: "2vh"}}>
			<div className="fs-5 text-white fw-semibold">
				welcome, {userInfo.username}
			</div>
			<button
				className="border-0 dropdown bg-primary"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<img
					src={ava}
					alt="avatar"
					className="rounded-circle cursor-pointer"
					width={32}
					height={32}
				/>
			</button>
			<ul className="dropdown-menu ">
				<li className="dropdown-item-text">
					<div className="flex-grow-1">
						<h6 className="mb-1">{userInfo.username}</h6>
					</div>
				</li>
				<hr />
				<li>
					<button
						onClick={() => dispatch(logoutAction())}
						className="dropdown-item"
					>
						<i className="me-2">
							<IconLogout size={16} />
						</i>
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
}

const HeaderApp = WithState(Header);
export default HeaderApp;
