import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ViewStateContainer } from "./ViewState";
import { fetchServices } from "../api/servicesApi";
import { DateTime } from "luxon";

export interface ServiceViewModel {
    id: number
    date: string
    description: string
}

const initialState: ViewStateContainer<ServiceViewModel[]> = { viewState: { status: "loading" } }

export const fetchServicesThunk = createAsyncThunk(
    "catalog/fetchServices",
    async () => {
        return (await fetchServices()).map((service) => {
            return {
                id: service.id,
                date: service.date.toLocaleString(DateTime.DATE_HUGE),
                description: service.selections.map(
                    (selection) => `${selection.genre}: ${selection.selection.title} - ${selection.selection.composer}`
                ).join("\n")
            }
        })
    }
)

export const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchServicesThunk.pending, (state) => {
            state.viewState = { status: "loading" }
        })
        .addCase(fetchServicesThunk.fulfilled, (state, action) => {
            state.viewState = { status: "idle", value: action.payload }
        })
        .addCase(fetchServicesThunk.rejected, (state, action) => {
            state.viewState = { status: "error", message: action.error.message ?? "" }
        })
    }
})

export const selectServices = (state: RootState) => state.services

export default servicesSlice.reducer