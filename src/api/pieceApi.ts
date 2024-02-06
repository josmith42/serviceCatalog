import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js"
import { DATA_SOURCE, SUPABASE_KEY, SUPABASE_URL } from '../buildConstants'
import { Platform } from 'react-native'
import { Piece } from '../model/Piece'
import { Database } from './dto/supabase'

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

export async function fetchPieces(): Promise<Piece[]> {
    console.log(`${Platform.OS} | fetchPieces() - supabase URL: ${SUPABASE_URL}`)
    if (DATA_SOURCE == "mock") {
        return generateFakePieces()
    }

    const { data, error } = await supabase
        .from('pieces')
        .select('id, title, composers!inner(name)')
    if (error) {
        return Promise.reject(error.message)
    }
    return data.map((piece: { id: number, title: string, composers: { name: string } | null }) => {
        return {
            id: piece.id,
            title: piece.title,
            composer: piece.composers?.name ?? ""
        }
    })
}

async function generateFakePieces(): Promise<Piece[]> {
    // Uncomment to inject delay in loading
    // await new Promise(resolve => setTimeout(resolve, 2000))

    // Uncomment to inject an error
    // return Promise.reject("This is an error message")
    return [
        { id: 1, title: "Prelude in C Major", composer: "J.S. Bach" },
        { id: 2, title: "Offertoire", composer: "Louis Raffy" },
        { id: 3, title: "Recessional", composer: "Douglas E. Wagner" },
        { id: 4, title: "Fugue in G minor", composer: "J.S. Bach" }
    ]
}