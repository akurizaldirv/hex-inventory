import { createBrowserRouter } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import TableApp from "../pages/table/Table";
import MenuApp from "../pages/menu/Menu";
import LoginComponent from "../pages/authentication/Login";
import TableList from "../pages/table/components/TableList";
import TableForm from "../pages/table/components/TableForm";
import MenuList from "../pages/menu/components/MenuList";
import MenuForm from "../pages/menu/components/MenuForm";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "table",
                element: <TableApp />,
                children: [
                    {
                        index: true,
                        element: <TableList />
                    },
                    {
                        path: "form",
                        element: <TableForm />
                    },
                ]
            },
            {
                path: "menu",
                element: <MenuApp />,
                children: [
                    {
                        index: true,
                        element: <MenuList />
                    },
                    {
                        path: "form",
                        element: <MenuForm />
                    },
                ]
            },
        ]
    },
    {
        path: "/login",
        element: <LoginComponent />
    },
])

export default Routes