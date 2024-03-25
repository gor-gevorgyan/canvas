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

    const body: Body = request.body

    // params.Add("lti_message_hint", queryParams.Get("lti_message_hint"))
	// params.Add("client_id", queryParams.Get("client_id"))
	// params.Add("login_hint", queryParams.Get("login_hint"))
	// params.Add("scope", "openid")
	// params.Add("prompt", "none")
	// params.Add("response_mode", "form_post")
	// params.Add("response_type", "id_token")
	// params.Add("state", random)
	// params.Add("nonce", random)
	// params.Add("redirect_uri", fmt.Sprintf("%s://%s/authorizeLTI?iss=%s", parsedTargetURI.Scheme, parsedTargetURI.Host, iss))

	// return fmt.Sprintf("%s/api/lti/authorize_redirect?%s", iss, params.Encode())

    let state: string = crypto.randomUUID();

    const params = {
        lti_message_hint: body.lti_message_hint,
        client_id: body.client_id,
        login_hint: body.login_hint,
        scope: "openid",
        prompt: "none",
        response_mode: "form_post",
        response_type: "id_token",
        state,
        nonce: state,
        redirect_uri: "https://canvas-lti.netlify.app/api/auth/canvas/authorize"
    };

    const searchParams = new URLSearchParams(params);

    response.redirect('https://sso.canvaslms.com/api/lti/authorize_redirect?' + encodeURIComponent(searchParams.toString()))
}