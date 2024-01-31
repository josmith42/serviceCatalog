import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js"
import { Piece } from "./dto/Piece"
import { DATA_SOURCE, SUPABASE_KEY, SUPABASE_URL } from '../buildConstants'
import { Platform } from 'react-native'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function fetchPieces(): Promise<Piece[]> {
    if (DATA_SOURCE == "mock") {
        return generateFakePieces()
    }

    const response = await supabase
        .from('pieces')
        .select('id, title, composers!inner(name)')
        return response.data as unknown as Piece[]
}

function generateFakePieces(): Promise<Piece[]> {
    return Promise.resolve([
        { id: 1, title: "Prelude in C Major", composers: { name: "J.S. Bach"} },
        { id: 2, title: "Offertoire", composers: { name: "Louis Raffy" } },
        { id: 3, title: "Recessional", composers: { name: "Douglas E. Wagner"}}
    ])
}