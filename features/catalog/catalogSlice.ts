import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Piece } from "../../app/types/Piece";

export interface CatalogState {
    value: Piece[]
}

export const mockData: Piece[] = [
  { title: "Offertoire", composer: "Louis Raffy" },
  { title: "Prelude in F major", composer: "J.S. Bach" },
  { title: "Praeludium", composer: "Hermann Schroeder" },
];

const initialState: CatalogState = {
    value: mockData
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
    }
})

export const selectCatalog = (state: RootState) => state.catalog

export default catalogSlice.reducer