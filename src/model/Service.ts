import { SelectionGenre } from "./SelectionGenre"

export interface Service {
    id: number
    date: string
    selections: SelectionGenre[]
}