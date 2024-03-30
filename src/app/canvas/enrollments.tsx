import axios from "axios";
import { pagination } from ".";
import { APIMinData, Pagintation } from "./types"

export type Enrollment = {
    user_id: number
    course_section_id: number
    role: string
    enrollment_state: string
}

export type EnrollmentData = {
    pagination: Pagintation
    enrollments: Enrollment[]
}

// url:GET|/api/v1/courses/:course_id/enrollments
export async function enrollmentsGet(apiMinData: APIMinData): Promise<EnrollmentData> {
    let data = await axios
        .get("https://"+ apiMinData.APIDomain +"/api/v1/courses/" + apiMinData.courseID + "/enrollments?per_page=1", {
            headers: {
                Authorization: apiMinData.AccessToken
            }
        });

    return {
        pagination: pagination(data.headers.link || ""),
        enrollments: data.data || []
    }
}