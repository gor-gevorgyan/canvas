import { NextApiRequest, NextApiResponse } from 'next';
import { JWKS } from "../../../../app/canvas";

const jwkToPem = require('jwk-to-pem');

const jwt = require('jsonwebtoken');

type ResponseData = {
    success: boolean
    data?: any
}

type Body = {
    id_token: string,
}

interface Request extends NextApiRequest {
    // let's say our request accepts name and age property
    body: Body
}

export default async function handler(request: Request, response: NextApiResponse<ResponseData>) {
    if (request.method !== "POST") {
        return response.status(200).json({ success: false })
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

    let key = await JWKS(stage);

    const publickKey = jwkToPem(key.keys[0]);
    const payload = jwt.decode(request.body.id_token, publickKey);

    response.status(200).json({ success: true, data: payload });
}