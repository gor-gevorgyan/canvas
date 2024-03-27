import { Login } from '@/app/canvas/types';
import { NextApiRequest, NextApiResponse } from 'next';

interface Request extends NextApiRequest {
    body: Login
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