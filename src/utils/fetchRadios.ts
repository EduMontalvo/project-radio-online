import axios from "axios"
import { RadiosSchema } from "../schema/RadioSchema"

export const FetchApiRadios = async () => {
    // const url = 'https://de1.api.radio-browser.info/json/stations/bycountry/Peru'
    const url = 'http://37.27.202.89/json/stations/bycountrycodeexact/PE'
    // const url = process.env.VITE_API_KEY
    const { data } = await axios(url)
    const result = RadiosSchema.safeParse(data)
    if (result.success) return result.data
    return []
}