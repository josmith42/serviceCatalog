import { DATA_SOURCE } from "../buildConstants"
import { Service } from "../model/Service"
import { supabaseClient } from "./supabaseClient"
import { DateTime } from "luxon"

export type DateSortDirection = "asc" | "desc"

export async function fetchServiceDetails(serviceId: number): Promise<Service> {
    const services = await fetchServiceApi({serviceId})
    if (services.length !== 1) {
        return Promise.reject("Service not found")
    }
    return services[0]
}

export async function fetchServices(filter: string | undefined, sortBy: DateSortDirection): Promise<Service[]> {
    return fetchServiceApi({filter: filter, sortBy: sortBy})
}

async function fetchServiceApi(options: { serviceId?: number, filter?: string, sortBy?: DateSortDirection }): Promise<Service[]> {
    const { serviceId, filter, sortBy } = options
    if (DATA_SOURCE == "mock") {
        return generateFakeServices(serviceId)
    }
    let servicesQuery = supabaseClient
        .rpc('get_services', { filter: filter ?? "", is_ascending: sortBy == "asc" })

    if (serviceId) {
        servicesQuery = servicesQuery.eq('id', serviceId)
    }

    const { data, error } = await servicesQuery
    if (error) {
        return Promise.reject(error.message)
    }

    type ServiceData = { id: number, date: string, genre: string, selection_id: number, title: string, composer: string }

    const groupedData = data?.reduce<Map<number, ServiceData[]>>((acc, row) => {
        if (!acc.has(row.id)) acc.set(row.id, [])
        acc.get(row.id)?.push(row)
        return acc
    }, new Map())

    const services: Service[] = []
    groupedData.forEach((value, key) => {
        if (value.length == 0) return // If this happens, something is wrong
        services.push({
            id: key,
            date: DateTime.fromISO(value[0].date),
            selections: value.map((service) => {
                return {
                    genre: service.genre,
                    selection: {
                        id: service.selection_id,
                        title: service.title,
                        composer: service.composer
                    }
                }
            })
        })
    })

    return services
}

function generateFakeServices(id: number | undefined = undefined): Promise<Service[]> {
    let services = [
        {
            id: 1,
            date: DateTime.fromISO("2021-01-01"),
            selections: [
                { genre: "Prelude", selection: { id: 1, title: "Prelude in C Major", composer: "J.S. Bach" } },
                { genre: "Offertory", selection: { id: 2, title: "Offertory in D Minor", composer: "J.S. Bach" } },
                { genre: "Postlude", selection: { id: 3, title: "Postlude in E Major", composer: "J.S. Bach" } }
            ]
        },
        {
            id: 2,
            date: DateTime.fromISO("2021-01-08"),
            selections: [
                { genre: "Prelude", selection: { id: 4, title: "Prelude in C Minor", composer: "J.S. Bach" } },
                { genre: "Offertory", selection: { id: 5, title: "Offertory in D Major", composer: "J.S. Bach" } },
                { genre: "Postlude", selection: { id: 6, title: "Postlude in E Minor", composer: "J.S. Bach" } }
            ]
        }
    ]
    if (id) {
        services = services.filter((s) => s.id == id)
    }
    return Promise.resolve(services)
}
