import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        return response.status(400).json({success: false});
    }

    // const topenGenerationURL: string = ("https://%s/login/oauth2/token?client_id=%s&client_secret=%s&code=%s",
	// 	domain.Host,
	// 	devData.ID,
	// 	*secret,
	// 	code,
	// )

    response.status(200).json({ success: true, data: request.query, headers: request.headers });
}