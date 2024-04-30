import { createSlice } from "@reduxjs/toolkit"

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        username: "admin",
        password: "12345678",
        isAuthenticated: true,
    },
    reducers: {
        login: (state, {payload}) => {
            if (payload.username === state.username && payload.password === state.password) {
                state.isAuthenticated = true;
            }
            console.log("is auth: ", state.isAuthenticated);
        },
        logout: (state) => {
            state.isAuthenticated = false
        }
    }
})

export const {login, logout} = AuthSlice.actions;
export default AuthSlice