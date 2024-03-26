import { NextApiRequest, NextApiResponse } from 'next';
import { JWKS } from "../../../../app/canvas";
import { promisify } from 'util';

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

        let key = await JWKS(stage);

        let d:any
        await promisify(jwt.verify)(request.body.id_token, key.keys[0])
            .then((res: any) => {
                d = res
            })
            .catch((err: any) => {
                d = err
            });

        response.status(200).json({ success: true, data: {d:d, i: request.body.id_token, k: key} })
}