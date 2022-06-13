const HZKZF_CITY_KEY = "hzkzf_city_key";

export const getLocalStoreageItem = (): object => {
    return JSON.parse(localStorage.getItem(HZKZF_CITY_KEY))
}

export const setLocalStoreageItem = (value: { label: string, value: string }) => {
    localStorage.setItem(HZKZF_CITY_KEY, JSON.stringify(value))
}