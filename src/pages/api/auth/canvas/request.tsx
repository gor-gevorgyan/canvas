import { assignmentsGet } from "@/app/canvas/assignments";
import { enrollmentsGet } from "@/app/canvas/enrollments";
import { APIMinData } from "@/app/canvas/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Request(req:NextApiRequest, res: NextApiResponse) {
    const apiMinData: APIMinData = {
        courseID: 2,
        APIDomain: "assignguard.instructure.com",
        AccessToken: "23718~hIVV8KhG54XAB0SxJphumOu0NeQX1x78bNgMetN2RAV8SUXnukLScKbaGK0YrNps"
    }

    let data = await enrollmentsGet(apiMinData)

    res.status(200).json(data)
}