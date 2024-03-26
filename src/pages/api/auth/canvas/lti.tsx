import { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from "node:crypto";

type Body = {
    iss: string,
    login_hint: string,
    client_id: string,
    lti_message_hint: string,
}

interface Request extends NextApiRequest {
    // let's say our request accepts name and age property
    body: Body
  }

export default function handler(request: Request, response: NextApiResponse) {
    if (request.method !== "POST") {
        response.status(400).json({ success: false })
    }

    let state: string = crypto.randomUUID();

    const params = {
        lti_message_hint: request.body.lti_message_hint,
        client_id: request.body.client_id,
        login_hint: request.body.login_hint,
        scope: "openid",
        prompt: "none",
        response_mode: "form_post",
        response_type: "id_token",
        state,
        nonce: state,
        redirect_uri: request.headers["x-forwarded-proto"] +  "://" + request.headers["x-forwarded-host"] + "/api/auth/canvas/authorize?iss=" + request.body.iss
    };

    const searchParams = new URLSearchParams(params);

    response.redirect(request.body.iss + '/api/lti/authorize_redirect?' + (searchParams.toString()))
}