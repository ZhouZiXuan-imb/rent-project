export interface TitleListItemInterface {
    title: string
    type: string
}

export interface titleSelectedStatus {
    onClick: any
    titleSelectedStatus: {
        area: boolean
        mode: boolean
        price: boolean
        more: boolean
    }
}