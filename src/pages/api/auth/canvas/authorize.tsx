import { NextApiResponse } from 'next';


type ResponseData = {
    success: boolean
    data?: any
}

export default function handler(request: Request, response: NextApiResponse<ResponseData>) {
    if (request.method !== "POST") {
        response.status(400).json({ success: false })
    }

    response.status(200).json({ success: true, data: request.body })
}