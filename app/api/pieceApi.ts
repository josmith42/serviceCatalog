import { createClient } from "@supabase/supabase-js"
import { Piece } from "../types/Piece"

const supabaseUrl = "http://localhost:54321"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchPieces(): Promise<Piece[]> {
    const response = await supabase
        .from('pieces')
        .select('id, title, composers!inner(name)')
    return response.data as Piece[]
}