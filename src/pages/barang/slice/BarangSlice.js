import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BarangService from "../service/BarangService";

const service = BarangService();

export const getBarangAction = createAsyncThunk("barang/getBarang", async () => {
	return await service.getAll();
});

export const addBarangAction = createAsyncThunk(
	"barang/addBarang",
	async (payload, thunkAPI) => {
		await service.create(payload);
		const response = await thunkAPI.dispatch(getBarangAction());
		return response.payload;
	}
);

export const updateBarangAction = createAsyncThunk(
	"barang/updateBarang",
	async (payload, thunkAPI) => {
		await service.update(payload);
		const response = await thunkAPI.dispatch(getBarangAction());
		return response.payload;
	}
);

export const removeBarangAction = createAsyncThunk(
	"barang/removeBarang",
	async (payload, thunkAPI) => {
		await service.remove(payload);
		const response = await thunkAPI.dispatch(getBarangAction());
		return response.payload;
	}
);

const BarangSlice = createSlice({
	name: "barang",
	initialState: {
		barangs: [],
		barang: null,
		isLoading: false,
		message: "",
	},
	reducers: {
		selectedBarang: (state, { payload }) => {
			state.barang = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getBarangAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getBarangAction.fulfilled, (state, { payload }) => {
			state.barangs = payload;
			state.isLoading = false;
		});
		builder.addCase(getBarangAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(addBarangAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addBarangAction.fulfilled, (state, { payload }) => {
			state.barangs = payload;
			state.isLoading = false;
		});
		builder.addCase(addBarangAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(updateBarangAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateBarangAction.fulfilled, (state, { payload }) => {
			state.barangs = payload;
			state.isLoading = false;
		});
		builder.addCase(updateBarangAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(removeBarangAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(removeBarangAction.fulfilled, (state, { payload }) => {
			state.barangs = payload;
			state.isLoading = false;
		});
		builder.addCase(removeBarangAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { add, remove, selectedBarang } = BarangSlice.actions;
export default BarangSlice;
