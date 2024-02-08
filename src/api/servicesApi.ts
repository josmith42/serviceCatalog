import { QueryData } from "@supabase/supabase-js"
import { DATA_SOURCE } from "../buildConstants"
import { Service } from "../model/Service"
import { supabaseClient } from "./supabaseClient"

type NoArray<T> = T extends Array<infer U> ? U : T;

export async function fetchServiceDetails(serviceId: number): Promise<Service> {
    const services = await fetchServiceApi(serviceId)
    if (services.length !== 1) {
        return Promise.reject("Service not found")
    }
    return services[0]
}

export async function fetchServices(): Promise<Service[]> {
    return fetchServiceApi()
}

async function fetchServiceApi(id: number | undefined = undefined): Promise<Service[]> {
    if (DATA_SOURCE == "mock") {
        return generateFakeServices()
    }
    let servicesQuery = supabaseClient
        .from('services')
        .select(
            `
            id,
            date,
            service_selections (
                genres!inner(name),
                selections!inner(id, title, composers!inner(name))
            )
            `
        )
        .order('date', { ascending: false })
    
    if (id) {
        servicesQuery = servicesQuery.eq('id', id)
    }

    type ServiceQueryResult = QueryData<typeof servicesQuery>
    type ServiceDto = NoArray<ServiceQueryResult>;
    type ServiceSelectionDto = NoArray<ServiceDto['service_selections']>;

    const { data, error } = await servicesQuery
    if (error) {
        return Promise.reject(error.message)
    }
    const services: ServiceQueryResult = data

    return services.map((service: ServiceDto) => {
        return {
            id: service.id,
            date: service.date,
            selections: service.service_selections.map((selection: ServiceSelectionDto) => {
                return {
                    genre: selection?.genres?.name ?? "",
                    selection: {
                        id: selection?.selections?.id ?? 0,
                        title: selection?.selections?.title ?? "",
                        composer: selection?.selections?.composers?.name ?? ""
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
