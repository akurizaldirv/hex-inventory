import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TableService from "../service/TableService";

const service = TableService();

export const getTableAction = createAsyncThunk("table/getTable", async () => {
	return await service.getAll();
});

export const addTableAction = createAsyncThunk(
	"table/addTable",
	async (payload, thunkAPI) => {
		await service.create(payload);
		const response = await thunkAPI.dispatch(getTableAction());
		return response.payload;
	}
);

export const removeTableAction = createAsyncThunk(
	"table/removeTable",
	async (payload, thunkAPI) => {
		await service.remove(payload);
		const response = await thunkAPI.dispatch(getTableAction());
		return response.payload;
	}
);

const TableSlice = createSlice({
	name: "table",
	initialState: {
		tables: [],
		table: null,
		isLoading: false,
		message: "",
	},
	reducers: {
		add: (state, { payload }) => {
			state.tables.push(payload);
		},
		remove: (state, { payload }) => {
			state.tables = state.tables.filter((table) => table.id !== payload);
		},
		selectedTable: (state, { payload }) => {
			state.table = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getTableAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getTableAction.fulfilled, (state, { payload }) => {
			state.tables = payload;
			state.isLoading = false;
		});
		builder.addCase(getTableAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(addTableAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addTableAction.fulfilled, (state, { payload }) => {
			state.tables = payload;
			state.isLoading = false;
		});
		builder.addCase(addTableAction.rejected, (state) => {
			state.isLoading = false;
		});

		builder.addCase(removeTableAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(removeTableAction.fulfilled, (state, { payload }) => {
			state.tables = payload;
			state.isLoading = false;
		});
		builder.addCase(removeTableAction.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { add, remove, selectedTable } = TableSlice.actions;
export default TableSlice;
