import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./pages/authentication/slice/AuthSlice";
import BarangSlice from "./pages/barang/slice/BarangSlice";

const store = configureStore({
    reducer: {
        barang: BarangSlice.reducer,
        auth: AuthSlice.reducer
    }
})

export default store