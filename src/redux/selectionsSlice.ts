import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSelections } from "../api/selectionApi";
import { RootState } from "./store";
import { Selection } from "../model/Selection";
import { ViewState } from "./ViewState";
import { DateTime } from "luxon";

export interface SelectionViewModel {
    id: number
    title: string
    description: string
}

export interface SelectionsViewState {
    selectionsState: ViewState<SelectionViewModel[]>
    filter: string
}

const initialState: SelectionsViewState = {
    selectionsState: { status: "loading" },
    filter: ""
}

export const setSelectionsFilterThunk = createAsyncThunk(
    "catalog/setFilter",
    async (filter: string, thunkApi: any) => {
        const setFilter = selectionsSlice.actions.setFilter
        thunkApi.dispatch(setFilter(filter))
        thunkApi.dispatch(fetchSelectionsThunk())
    }
)

function selectionToDescription(selection: Selection): string {
    return selection.composer + 
        (selection.lastDate ? "\nLast used: " + selection.lastDate.toLocaleString(DateTime.DATE_HUGE) : "")
}

export const fetchSelectionsThunk = createAsyncThunk(
    "catalog/fetchSelections",
    async (_, thunkApi: any) => {
        const filter = thunkApi.getState().selections.filter
        const response = await fetchSelections(filter)
        return response.map((selection: Selection) => {
            return {
                id: selection.id,
                title: selection.title,
                description: selectionToDescription(selection),
            }
        })
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
        }).addCase(fetchSelectionsThunk.fulfilled, (state, action) => {
            state.selectionsState = { status: "idle", value: action.payload }
        }).addCase(fetchSelectionsThunk.rejected, (state, action) => {
            state.selectionsState = { status: "error", message: action.error.message ?? "" }
        })
    }
})

export const selectSelections = (state: RootState) => state.selections

export default selectionsSlice.reducer