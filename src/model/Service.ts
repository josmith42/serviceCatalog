import { DateTime } from "luxon"
import { SelectionGenre } from "./SelectionGenre"

export interface Service {
    id: number
    date: DateTime
    selections: SelectionGenre[]
}