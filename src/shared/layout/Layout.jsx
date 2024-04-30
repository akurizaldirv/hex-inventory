import Sidebar from '../sidebar/Sidebar';
import HeaderApp from '../header/Header';
import LoginComponent from '../../pages/authentication/Login';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const Layout = () => {
    const {isAuthenticated} = useSelector(state => state.auth)
    
    return (
        <div style={{ margin: "2vh" }}>
            {isAuthenticated ? (
                <div className="d-flex">
                    <Sidebar />
                    <main className="w-100 flex-grow-1">
                        <HeaderApp />
                        <Outlet />
                    </main>
                </div>
            ) : (
                <LoginComponent />
            )}
        </div>
    );
}

export default Layout