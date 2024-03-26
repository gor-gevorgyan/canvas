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

type CustomData = {
    account_name: string
    canvas_user_id: string
    canvas_course_id: string
    membership_roles: string
    canvas_account_id: string
    canvas_api_domain: string
    external_tool_url: string
    launch_presentation_locale: string
    canvas_root_account_id: string
    canvas_root_account_uuid: string
    canvas_course_section_ids: string
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

    let customData: CustomData = payload["https://purl.imsglobal.org/spec/lti/claim/custom"];

    response.status(200).json({ success: true, data: customData });
}