import { DATA_SOURCE } from "../buildConstants"
import { Service } from "../model/Service"
import { supabaseClient } from "./supabaseClient"

export async function fetchServices(): Promise<Service[]> {
    if (DATA_SOURCE == "mock") {
        return generateFakeServices()
    }
    const {data, error } = await supabaseClient
        .from('services')
        .select(
            `
            id,
            date,
            service_selections (
                genres!inner(name)
            )
            `
        )
    if (error) {
        return Promise.reject(error.message)
    }
    console.log(data)
    return data.map((service: { id: number, date: string, service_selections: any }) => {
        return {
            id: service.id,
            date: service.date,
            selections: service.service_selections.map((selection: { genres: { name: string } }) => {
                return {
                    genre: selection.genres.name,
                    selection: {
                        id: 0,
                        title: "",
                        composer: "",
                    }
                }
            })
        }
    })
}

function generateFakeServices(): Promise<Service[]> {
    return Promise.resolve([
        {
            id: 1,
            date: "2021-01-01",
            selections: [
                { genre: "Prelude", selection: { id: 1, title: "Prelude in C Major", composer: "J.S. Bach" } },
                { genre: "Offertory", selection: { id: 2, title: "Offertory in D Minor", composer: "J.S. Bach" } },
                { genre: "Postlude", selection: { id: 3, title: "Postlude in E Major", composer: "J.S. Bach" } }
            ]
        },
        {
            id: 2,
            date: "2021-01-08",
            selections: [
                { genre: "Prelude", selection: { id: 4, title: "Prelude in C Minor", composer: "J.S. Bach" } },
                { genre: "Offertory", selection: { id: 5, title: "Offertory in D Major", composer: "J.S. Bach" } },
                { genre: "Postlude", selection: { id: 6, title: "Postlude in E Minor", composer: "J.S. Bach" } }
            ]
        }
    ])
}
