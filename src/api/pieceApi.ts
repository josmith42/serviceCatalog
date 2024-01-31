import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js"
import { Piece } from "./dto/Piece"
import { DATA_SOURCE, SUPABASE_KEY, SUPABASE_URL } from '../buildConstants'
import { Platform } from 'react-native'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function fetchPieces(): Promise<Piece[]> {
    console.log(`${Platform.OS} | fetchPieces() - supabase URL: ${SUPABASE_URL}`)
    if (DATA_SOURCE == "mock") {
        return generateFakePieces()
    }

    const { data, error } = await supabase
        .from('pieces')
        .select('id, title, composers!inner(name)')
    if (error) {
        return Promise.reject("error")
    }
    return data as unknown as Piece[]
}

async function generateFakePieces(): Promise<Piece[]> {
    // Uncomment to inject delay in loading
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return [
        { id: 1, title: "Prelude in C Major", composers: { name: "J.S. Bach"} },
        { id: 2, title: "Offertoire", composers: { name: "Louis Raffy" } },
        { id: 3, title: "Recessional", composers: { name: "Douglas E. Wagner"} },
        { id: 4, title: "Fugue in G minor", composers: { name: "J.S. Bach"} }
    ]
}