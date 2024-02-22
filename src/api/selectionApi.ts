import 'react-native-url-polyfill/auto'
import { DATA_SOURCE, SUPABASE_URL } from '../buildConstants'
import { Platform } from 'react-native'
import { Selection } from '../model/Selection'
import { supabaseClient } from './supabaseClient'

export async function fetchSelections(filter: string | undefined): Promise<Selection[]> {
    console.log(`${Platform.OS} | fetchSelections() - supabase URL: ${SUPABASE_URL}`)
    if (DATA_SOURCE == "mock") {
        return generateFakeSelections()
    }

    let query = supabaseClient
        .from('selections')
        .select('id, title, composers(name)')
    if (filter) {
        // todo - fix this query
        // query = query
            // .or(`composers.name.ilike.%${filter}%`)
            // .or(`title.ilike.%${filter}%`)

        query = query.ilike("title", `%${filter}%`)
    }
    const { data, error } = await query
    if (error) {
        return Promise.reject(error.message)
    }
    return data.map((selection: { id: number, title: string, composers: { name: string } | null }) => {
        return {
            id: selection.id,
            title: selection.title,
            composer: selection.composers?.name ?? ""
        }
    })
}

async function generateFakeSelections(): Promise<Selection[]> {
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