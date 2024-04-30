import { configureStore } from "@reduxjs/toolkit";
import TableSlice from "./pages/table/slice/TableSlice";
import AuthSlice from "./pages/authentication/slice/AuthSlice";
import MenuSlice from "./pages/menu/slice/MenuSlice";

const store = configureStore({
    reducer: {
        table: TableSlice.reducer,
        menu: MenuSlice.reducer,
        auth: AuthSlice.reducer
    }
})

export default store