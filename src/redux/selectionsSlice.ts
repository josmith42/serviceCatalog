import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSelections } from "../api/selectionApi";
import { RootState } from "./store";
import { Selection } from "../model/Selection";
import { ViewStateContainer } from "./ViewState";

const initialState: ViewStateContainer<Selection[]> = { viewState: { status: "loading" } }

export const fetchSelectionsThunk = createAsyncThunk(
    "catalog/fetchSelections",
    async () => {
        const response = await fetchSelections()
        return response
    }
)

export const selectionsSlice = createSlice({
    name: "selections",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(fetchSelectionsThunk.pending, (state) => {
            state.viewState = { status: "loading" }
        })
        .addCase(fetchSelectionsThunk.fulfilled, (state, action) => {
            state.viewState = { status: "idle", value: action.payload }
        })
        .addCase(fetchSelectionsThunk.rejected, (state, action) => {
            state.viewState = { status: "error", message: action.error.message ?? "" }
        })
    }
})

export const selectSelections = (state: RootState) => state.selections

export default selectionsSlice.reducer