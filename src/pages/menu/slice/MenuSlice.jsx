import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MenuService from "../service/MenuService";

const service = MenuService();

export const getMenuAction = createAsyncThunk("menu/getMenu", async () => {
	return await service.getAll();
});

export const addMenuAction = createAsyncThunk(
	"menu/addMenu",
	async (payload, thunkAPI) => {
		await service.create(payload);
		const response = await thunkAPI.dispatch(getMenuAction());
		return response.payload;
	}
);

export const updateMenuAction = createAsyncThunk(
	"menu/updateMenu",
	async (payload, thunkAPI) => {
		await service.update(payload);
		const response = await thunkAPI.dispatch(getMenuAction());
		return response.payload;
	}
);

export const removeMenuAction = createAsyncThunk(
	"menu/removeMenu",
	async (payload, thunkAPI) => {
		await service.remove(payload);
		const response = await thunkAPI.dispatch(getMenuAction());
		return response.payload;
	}
);

const MenuSlice = createSlice({
	name: "menu",
	initialState: {
		menus: [],
		menu: null,
		isLoading: false,
		message: "",
	},
	reducers: {
		selectedMenu: (state, { payload }) => {
			state.menu = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMenuAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getMenuAction.fulfilled, (state, { payload }) => {
			state.menus = payload;
			state.isLoading = false;
		});
		builder.addCase(getMenuAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(addMenuAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addMenuAction.fulfilled, (state, { payload }) => {
			state.menus = payload;
			state.isLoading = false;
		});
		builder.addCase(addMenuAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(removeMenuAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(removeMenuAction.fulfilled, (state, { payload }) => {
			state.menus = payload;
			state.isLoading = false;
		});
		builder.addCase(removeMenuAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { selectedMenu } = MenuSlice.actions;
export default MenuSlice;
