import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js"
import { Piece } from "./dto/Piece"
import { DATA_SOURCE } from '../featureFlags'
import { Platform } from 'react-native'

const supabaseUrl = Platform.OS === 'android' ? "http://10.0.2.2:54321" : "http://localhost:54321"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
const supabase = createClient(supabaseUrl, supabaseKey)

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