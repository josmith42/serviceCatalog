import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSelections } from "../api/selectionApi";
import { RootState } from "./store";
import { Selection } from "../model/Selection";
import { ViewState } from "./ViewState";

export interface SelectionsViewState {
    selectionsState: ViewState<Selection[]>
    filter: string
}

const initialState: SelectionsViewState = { selectionsState: { status: "loading" }, filter: "" }

export const setFilterThunk = createAsyncThunk(
    "catalog/setFilter",
    async (filter: string, thunkApi: any) => {
        const setFilter = selectionsSlice.actions.setFilter
        thunkApi.dispatch(setFilter(filter))
        if (filter === "") {
            thunkApi.dispatch(fetchSelectionsThunk())
        } else {
            thunkApi.dispatch(fetchSelectionsThunk(filter))
        }
    }
)

export const fetchSelectionsThunk = createAsyncThunk(
    "catalog/fetchSelections",
    async (filter: string | undefined) => {
        const response = await fetchSelections(filter)
        return response
    }
)

export const selectionsSlice = createSlice({
    name: "selections",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSelectionsThunk.pending, (state) => {
            state.selectionsState = { status: "loading" }
        })
            .addCase(fetchSelectionsThunk.fulfilled, (state, action) => {
                state.selectionsState = { status: "idle", value: action.payload }
            })
            .addCase(fetchSelectionsThunk.rejected, (state, action) => {
                state.selectionsState = { status: "error", message: action.error.message ?? "" }
            })
    }
})

export const selectSelections = (state: RootState) => state.selections

export default selectionsSlice.reducer