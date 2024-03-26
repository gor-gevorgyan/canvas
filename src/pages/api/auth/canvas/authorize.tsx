import { NextApiRequest, NextApiResponse } from 'next';
import { JWKS } from "../../../../app/canvas";

type ResponseData = {
    success: boolean
    data?: any
}

export default async function handler(request: NextApiRequest, response: NextApiResponse<ResponseData>) {
    if (request.method !== "POST") {
        return response.status(400).json({ success: false })
    }

    const iss:string = request.query.iss as string;

        let stage: string;

        switch (true) {
            case iss.includes("beta"):
                stage = "beta";

                break;

            case iss.includes("test"):
                stage = "test";

                break;

            default:
                stage = "";
        }

        let x = await JWKS(stage);

        response.status(200).json({ success: false, data: x })
}