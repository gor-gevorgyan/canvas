import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        return response.status(400).json({success: false});
    }

    response.status(200).json({ success: true, data: request.query });
}