import client from './client'

export interface PriceItem {
    id: number
    title: string
    icon: string | null
    price: string
    term: string
    description: string | null
    sort_order: number
}

export const apiGetPriceItems = () => client.get<PriceItem[]>('/price-items')
export const apiCreatePriceItem = (data: Omit<PriceItem, 'id'>) => client.post<PriceItem>('/price-items', data)
export const apiUpdatePriceItem = (id: number, data: Partial<PriceItem>) => client.put<PriceItem>(`/price-items/${id}`, data)
export const apiDeletePriceItem = (id: number) => client.delete(`/price-items/${id}`)
