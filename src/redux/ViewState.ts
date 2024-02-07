import { AsyncThunk, Draft, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export type ViewState<T> = 
    | { status: "idle"; value: T }
    | { status: "loading" }
    | { status: "error"; message: string }

export interface ViewStateContainer<T> {
    viewState: ViewState<T>
}