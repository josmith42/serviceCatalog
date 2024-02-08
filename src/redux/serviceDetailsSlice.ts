import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ViewStateContainer } from "./ViewState";
import { fetchServiceDetails } from "../api/servicesApi";
import { DateTime } from "luxon";


interface ServiceDetailsViewModel { 
    id: number
    date: string
}

const initialState: ViewStateContainer<ServiceDetailsViewModel> = { viewState: { status: "loading" } }

export const fetchServiceDetailsThunk = createAsyncThunk(
    "catalog/fetchService",
    async (id: number) => {
        const details = await fetchServiceDetails(id)
        return {
            id: details.id,
            date: details.date.toLocaleString(DateTime.DATE_HUGE)
        }
    }
)

export const serviceDetailsSlice = createSlice({
    name: "serviceDetails",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(fetchServiceDetailsThunk.pending, (state) => {
            state.viewState = { status: "loading" }
        })
        .addCase(fetchServiceDetailsThunk.fulfilled, (state, action) => {
            state.viewState = { status: "idle", value: action.payload }
        })
        .addCase(fetchServiceDetailsThunk.rejected, (state, action) => {
            state.viewState = { status: "error", message: action.error.message ?? "" }
        })
    }
})

export const selectServiceDetails = (state: RootState) => state.serviceDetails

export default serviceDetailsSlice.reducer