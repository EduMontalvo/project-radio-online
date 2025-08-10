import axios from "axios";
import { RadiosSchema } from "../schema/RadioSchema";

export const DateFormat = (date: Date) => {

    const hours = date.getHours();
    const hoursWithFormat = hours % 12 ? (hours % 12 < 10 ? `0${hours % 12}` : `${hours % 12}`) : '12';
    const minuts = date.getMinutes()
    const minutsWithFormat = minuts < 10 ? `0${minuts}` : `${minuts}`

    return {
        hours: hoursWithFormat,
        minuts: minutsWithFormat
    }
}
export const FetchApiRadios = async () => {
    const url = 'https://de1.api.radio-browser.info/json/stations/bycountry/Peru'
    const { data } = await axios(url)
    const result = RadiosSchema.safeParse(data)
    if (result.success) return result.data
    return []
}