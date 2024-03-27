import { CanvasAPI } from '@/app/canvas/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        return response.status(400).json({success: false});
    }

    return response.status(200).json({data: request.query})

    let cleint: CanvasAPI = {
        clientID: "237180000000000004",
        clientSecret: "j7zhU3gcDncKftA50hIaHNvTC1P44KHK1qkssDeaq03nZyaFQHrbtWRXIJTqCqdz"
    }

    let referer = new URL(request.headers.referer || "");
    let url: string = referer.origin + "/login/oauth2/token?client_id="+ cleint.clientID + "&client_secret=" + cleint.clientSecret + "&code=" + request.query.code;
    
    let tokenData = await fetch(url, {
        method: "POST"
    }).then(res => res.json());

    response.status(200).json({ success: true, data: tokenData });
}