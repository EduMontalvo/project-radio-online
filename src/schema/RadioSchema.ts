import { z } from "zod";

export const RadioSchema = z.object({
    stationuuid: z.string(),
    name: z.string(),
    url_resolved: z.string(),
    favicon: z.string().optional(),
    tags: z.string().optional(),
    country: z.string(),
    countrycode: z.string(),
    state: z.string().optional()
})
export const RadiosSchema = z.array(RadioSchema)


//tipado
export type Radio = z.infer<typeof RadioSchema>