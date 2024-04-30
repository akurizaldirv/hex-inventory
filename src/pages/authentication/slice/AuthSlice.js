import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../service/AuthService";

const service = AuthService();

export const getUserInfo = createAsyncThunk("auth/check", async () => {
	return service.getUserInfo();
});

export const loginAction = createAsyncThunk(
	"auth/login",
	async (payload, thunkAPI) => {
		await service.login(payload);
		const response = await thunkAPI.dispatch(getUserInfo());
		return response.payload;
	}
);

export const logoutAction = createAsyncThunk(
	"auth/logout",
	async (payload, thunkAPI) => {
		await service.logout();
		const response = await thunkAPI.dispatch(getUserInfo());
		return response.payload;
	}
);

const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		isLoading: false,
		userInfo: {},
		notification: {
            message: "",
            color: "primary"
        },
	},
	reducers: {
		clearMessage: (state) => {
			state.notification.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
			state.userInfo = payload;
			state.isLoading = false;
		});
		builder.addCase(getUserInfo.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(loginAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loginAction.fulfilled, (state, { payload }) => {
			state.notification.message = "Berhasil Login";
            state.notification.color = "secondary";
			state.userInfo = payload;
			state.isLoading = false;
		});
		builder.addCase(loginAction.rejected, (state) => {
            state.notification.message = "Username/Password salah";
			state.notification.color = "danger";
			state.isLoading = false;
		});
        
		builder.addCase(logoutAction.pending, (state) => {
            state.notification.message = "Berhasil Logout"
            state.notification.color = "secondary";
			state.isLoading = true;
		});
		builder.addCase(logoutAction.fulfilled, (state, { payload }) => {
			state.userInfo = payload;
			state.isLoading = false;
		});
		builder.addCase(logoutAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { clearMessage } = AuthSlice.actions;
export default AuthSlice;
