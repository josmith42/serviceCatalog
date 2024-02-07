import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ViewStateContainer } from "./ViewState";
import { fetchServices } from "../api/servicesApi";

interface ServiceViewModel {
    date: string
    description: string
}

const initialState: ViewStateContainer<ServiceViewModel[]> = { viewState: { status: "loading" } }

export const fetchServicesThunk = createAsyncThunk(
    "catalog/fetchServices",
    async () => {
        return (await fetchServices()).map((service) => {
            return {
                date: service.date,
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
    reducers: { },
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