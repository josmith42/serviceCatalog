import { DateTime } from "luxon"

export interface Selection {
    id: number
    title: string
    composer: string
    lastDate?: DateTime
}