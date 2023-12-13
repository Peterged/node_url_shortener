import { z } from 'zod'

const URISchema = z.object({
    targetUrl: z.string().url({ message: "Invalid url"}).required(),
    shortenedUrl: z.string().min(3, { message: "Must be 3 or more characters long" })
})

export default URISchema