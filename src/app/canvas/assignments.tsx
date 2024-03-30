import axios from "axios";
import { APIMinData, Pagintation } from "./types";
import { pagination } from ".";

export type Assignment = {
    id: number
    name: string
    description: string
}

export type AssignmentsData = {
    pagination: Pagintation
    assinmetns: Assignment[]
}

// url:GET|/api/v1/courses/:course_id/assignments
export async function assignmentsGet(apiMinData: APIMinData): Promise<AssignmentsData> {
    // per_page=30 is optimal variant for get data from canvas LMS

    let data = await axios
        .get("https://"+ apiMinData.APIDomain +"/api/v1/courses/" + apiMinData.courseID + "/assignments?per_page=30", {
            headers: {
                Authorization: apiMinData.AccessToken
            }
        });

    return {
        pagination: pagination(data.headers.link || ""),
        assinmetns: data.data || []
    }
}