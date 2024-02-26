import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ViewState, ViewStateContainer } from "./ViewState";
import { fetchServices } from "../api/servicesApi";
import { DateTime } from "luxon";

export interface ServiceViewModel {
    id: number
    date: string
    description: string
}

export interface ServicesViewState {
    servicesState: ViewState<ServiceViewModel[]>
    filter: string
}

const initialState: ServicesViewState = { servicesState: { status: "loading" }, filter: "" }

export const setServicesFilterThunk = createAsyncThunk(
    "services/setServicesFilter",
    async (filter: string, thunkApi: any) => {
        const setFilter = servicesSlice.actions.setFilter
        thunkApi.dispatch(setFilter(filter))
        if (filter === "") {
            thunkApi.dispatch(fetchServicesThunk())
        } else {
            thunkApi.dispatch(fetchServicesThunk(filter))
        }
    }
)

export const fetchServicesThunk = createAsyncThunk(
    "catalog/fetchServices",
    async (filter: string | undefined) => {
        return (await fetchServices(filter)).map((service) => {
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
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchServicesThunk.pending, (state) => {
            state.servicesState = { status: "loading" }
        })
        .addCase(fetchServicesThunk.fulfilled, (state, action) => {
            state.servicesState = { status: "idle", value: action.payload }
        })
        .addCase(fetchServicesThunk.rejected, (state, action) => {
            state.servicesState = { status: "error", message: action.error.message ?? "" }
        })
    }
})

export const selectServices = (state: RootState) => state.services

export default servicesSlice.reducer