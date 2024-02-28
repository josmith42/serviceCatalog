import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ViewState, ViewStateContainer } from "./ViewState";
import { DateSortDirection, fetchServices } from "../api/servicesApi";
import { DateTime } from "luxon";

export interface ServiceViewModel {
    id: number
    date: string
    description: string
}

export interface ServicesViewState {
    servicesState: ViewState<ServiceViewModel[]>
    filter: string
    isFilterMenuOpen: boolean
    sortState: DateSortDirection
}

const initialState: ServicesViewState = {
    servicesState: { status: "loading" },
    filter: "",
    isFilterMenuOpen: false,
    sortState: "desc"
}

export const setServicesFilterThunk = createAsyncThunk(
    "services/setServicesFilter",
    async (filter: string, thunkApi: any) => {
        const setFilter = servicesSlice.actions.setFilter
        thunkApi.dispatch(setFilter(filter))
        thunkApi.dispatch(fetchServicesThunk())
    }
)

export const setSortByThunk = createAsyncThunk(
    "services/setSortBy",
    async (sortBy: DateSortDirection, thunkApi: any) => {
        const setSortBy = servicesSlice.actions.setSortBy
        thunkApi.dispatch(setSortBy(sortBy))
        thunkApi.dispatch(fetchServicesThunk())
    }
)

export const fetchServicesThunk = createAsyncThunk(
    "catalog/fetchServices",
    async (_, thunkApi: any) => {
        const { filter, sortState } = thunkApi.getState().services
        return (await fetchServices(filter, sortState)).map((service) => {
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
        },
        setSortModalDisplayed: (state, action) => {
            state.isFilterMenuOpen = action.payload
        },
        setSortBy: (state, action) => {
            state.sortState = action.payload
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

export const setSortModalDisplayed = servicesSlice.actions.setSortModalDisplayed

export default servicesSlice.reducer