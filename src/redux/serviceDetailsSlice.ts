import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ViewStateContainer } from "./ViewState";
import { fetchServiceDetails, fetchServices } from "../api/servicesApi";
import { Service } from "../model/Service";

const initialState: ViewStateContainer<Service> = { viewState: { status: "loading" } }

export const fetchServiceDetailsThunk = createAsyncThunk(
    "catalog/fetchService",
    async (id: number) => {
        return await fetchServiceDetails(id)
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