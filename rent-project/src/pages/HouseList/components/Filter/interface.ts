export interface initPickerViewData {
    // FilterMore
    roomType: Array<object>
    oriented?: Array<object>
    floor?: Array<object>
    characteristic?: Array<object>
    // FilterPicker
    area: {
        children?: Array<object>
        label?: string
        value?: string
    }
    subway: {
        children?: Array<object>
        label?: string
        value?: string
    }
    rentType: Array<object>
    price: Array<object>
}

export interface SelectedValuesInterface {
    area: Array<string>
    mode: Array<string>
    price: Array<string>
    more: []
}

export interface TitleSelectedStatusInterface {
    area: boolean
    mode: boolean
    price: boolean
    more: boolean
}

export interface FilterDataInterface {
    area: string
    mode: string
    price: string
    more: string
}