import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSelections } from "../api/selectionApi";
import { RootState } from "./store";
import { Selection } from "../model/Selection";

export interface CatalogState {
    value: Selection[],
    error: string | undefined,
    status: "idle" | "loading" | "error"
}

const initialState: CatalogState = {
    value: [],
    error: undefined,
    status: "loading"
}

export const fetchSelectionsThunk = createAsyncThunk(
    "catalog/fetchCatalog",
    async () => {
        const response = await fetchSelections()
        return response
    }
)

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(fetchSelectionsThunk.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchSelectionsThunk.fulfilled, (state, action) => {
            state.status = "idle"
            state.value = action.payload
        })
        .addCase(fetchSelectionsThunk.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export const selectCatalog = (state: RootState) => state.catalog

export default catalogSlice.reducer