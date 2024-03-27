import { NextApiRequest, NextApiResponse } from 'next';
import { JWKS, Scopes } from "../../../../app/canvas";
import { redirect } from 'next/dist/server/api-utils';

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

    // check token exists or not and generate

    redirect(response, generateRedirectToGenerateToken(request, customData))

    // response.redirect(generateRedirectToGenerateToken(request, customData))

    // response.status(200).json({ success: true, data: customData });
}

function generateRedirectToGenerateToken(request: Request, customData: CustomData) : string {
    let redirectURI: string = request.headers["x-forwarded-proto"] +  "://" + request.headers["x-forwarded-host"] + "/api/auth/canvas/user-data";
    const state: string = customData.canvas_root_account_uuid + "_" + customData.canvas_course_id + "_" + customData.canvas_user_id;

    return "https://" + customData.canvas_api_domain + "/login/oauth2/auth?response_type=code&client_id=237180000000000004&scope=" + Scopes() + "&redirect_uri=" + redirectURI;
}