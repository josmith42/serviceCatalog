import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Piece } from "../../api/dto/Piece";
import { fetchPieces } from "../../api/pieceApi";

export interface CatalogState {
    value: Piece[],
    error: string | undefined,
    status: "idle" | "loading" | "error"
}

const initialState: CatalogState = {
    value: [],
    error: undefined,
    status: "loading"
}

export const fetchPiecesThunk = createAsyncThunk(
    "catalog/fetchPieces",
    async () => {
        const response = await fetchPieces()
        return response
    }
)

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(fetchPiecesThunk.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchPiecesThunk.fulfilled, (state, action) => {
            state.status = "idle"
            state.value = action.payload
        })
        .addCase(fetchPiecesThunk.rejected, (state, action) => {
            state.status = "error"
            state.error = action.error.message
        })
    }
})

export const selectCatalog = (state: RootState) => state.catalog

export default catalogSlice.reducer