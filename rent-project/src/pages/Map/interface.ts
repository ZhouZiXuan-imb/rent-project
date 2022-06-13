export interface CurrentCityHousInterface {
    coord: { latitude: string, longitude: string }
    count: number
    label: string
    value: string
}

export interface RenderHouseItemInterface {
    desc: string
    houseCode: string
    houseImg: string
    price: number
    tags: [string]
    title: string
}