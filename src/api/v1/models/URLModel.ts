import { UUID } from "crypto"

type URIModel = {
    longUrl: string,
    shortUrl: string,
    id: UUID,
    createdAt: Date,
    purpose: "generated" | "custom"
};

export default URIModel;