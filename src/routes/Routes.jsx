import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginComponent from "../pages/authentication/Login";
import BarangApp from "../pages/barang/Barang";
import BarangList from "../pages/barang/components/BarangList";
import BarangFormWithState from "../pages/barang/components/BarangForm";

const Routes = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "barang",
				element: <BarangApp />,
				children: [
					{
						index: true,
						element: <BarangList />,
					},
					{
						path: "form",
						element: <BarangFormWithState />,
					},
				],
			},
		],
	},
	{
		path: "/login",
		element: <LoginComponent />,
	},
]);

export default Routes;
