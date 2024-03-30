import { JWK, Pagintation } from "./types";

export function Scopes() : string {
    return [
        "url:GET|/api/v1/courses/:course_id/assignment_groups",
        "url:GET|/api/v1/courses/:course_id/assignment_groups/:assignment_group_id",
        "url:GET|/api/v1/courses/:course_id/assignments/:assignment_id/overrides",
        "url:GET|/api/v1/courses/:course_id/assignments/:assignment_id/overrides/:id",
        "url:GET|/api/v1/sections/:course_section_id/assignments/:assignment_id/override",
        "url:GET|/api/v1/groups/:group_id/assignments/:assignment_id/override",
        "url:GET|/api/v1/courses/:course_id/assignments/overrides",
        "url:GET|/api/v1/courses/:course_id/assignments",
        "url:GET|/api/v1/courses/:course_id/assignment_groups/:assignment_group_id/assignments",
        "url:GET|/api/v1/users/:user_id/courses/:course_id/assignments",
        "url:GET|/api/v1/courses/:course_id/assignments/:id",
        "url:GET|/api/v1/courses/:course_id/discussion_topics",
        "url:GET|/api/v1/groups/:group_id/discussion_topics",
        "url:GET|/api/v1/courses/:course_id/discussion_topics/:topic_id",
        "url:GET|/api/v1/groups/:group_id/discussion_topics/:topic_id",
        "url:GET|/api/v1/courses/:course_id/files",
        "url:GET|/api/v1/courses/:course_id/folders",
        "url:POST|/api/v1/courses/:course_id/folders",
        "url:GET|/api/v1/courses/:course_id/folders/media",
        "url:GET|/api/v1/courses/:course_id/folders/:id",
        "url:GET|/api/v1/users/:user_id/files",
        "url:GET|/api/v1/users/:user_id/folders",
        "url:POST|/api/v1/users/:user_id/folders",
        "url:GET|/api/v1/users/:user_id/folders/:id",
        "url:GET|/api/v1/groups/:group_id/files",
        "url:GET|/api/v1/groups/:group_id/folders",
        "url:POST|/api/v1/groups/:group_id/folders",
        "url:GET|/api/v1/files/:id",
        "url:DELETE|/api/v1/files/:id",
        "url:PUT|/api/v1/files/:id",
        "url:POST|/api/v1/files/:id",
        "url:GET|/api/v1/courses/:course_id/files/:id",
        "url:GET|/api/v1/groups/:group_id/files/:id",
        "url:GET|/api/v1/users/:user_id/files/:id",
        "url:GET|/api/v1/folders/:id",
        "url:GET|/api/v1/folders/:id/folders",
        "url:GET|/api/v1/folders/:id/files",
        "url:POST|/api/v1/folders/:folder_id/folders",
        "url:POST|/api/v1/folders/:folder_id/files",
        "url:GET|/api/v1/courses/:course_id/modules",
        "url:GET|/api/v1/courses/:course_id/modules/:id",
        "url:GET|/api/v1/courses/:course_id/modules/:module_id/items",
        "url:GET|/api/v1/courses/:course_id/modules/:module_id/items/:id",
        "url:GET|/api/v1/courses/:course_id/front_page",
        "url:GET|/api/v1/groups/:group_id/front_page",
        "url:PUT|/api/v1/courses/:course_id/front_page",
        "url:PUT|/api/v1/groups/:group_id/front_page",
        "url:GET|/api/v1/courses/:course_id/pages",
        "url:GET|/api/v1/groups/:group_id/pages",
        "url:GET|/api/v1/courses/:course_id/pages/:url_or_id",
        "url:GET|/api/v1/groups/:group_id/pages/:url_or_id",
        "url:GET|/api/v1/courses/:course_id/quizzes",
        "url:GET|/api/v1/courses/:course_id/quizzes/:id",
        "url:GET|/api/v1/courses/:course_id/all_quizzes",
        "url:GET|/api/v1/courses/:course_id/enrollments"
    ].join(" ");
}

export async function JWKS(stage: string) : Promise<JWK> {
    return await fetch(`https://canvas.${stage}instructure.com/api/lti/security/jwks`)
        .then(res => res.json())
        .then(res => res);
}

export function pagination(data: string) : Pagintation {
    let itemsData = data.replaceAll(/[<>]/gi, "").split(",");
    let pagination = {} as Pagintation;

    for (let item of itemsData) {
        let searchParams: URLSearchParams; 

        switch (true) {
            case item.includes('; rel="current"'):
                pagination.current = item.replace('; rel="current"', "");

                searchParams = new URLSearchParams(pagination.current);
                let currnetPage = searchParams.get("page") || "";

                pagination.page = +currnetPage || 1;

                if (currnetPage !== "first") {
                    pagination.currentBookmark = currnetPage
                }

                break;

            case item.includes('; rel="next"'):
                pagination.next = item.replace('; rel="next"', "");

                if (pagination.currentBookmark === "" || pagination.currentBookmark.includes("bookmark:")) {
                    searchParams = new URLSearchParams(pagination.next);
    
                    pagination.currentBookmark = searchParams.get("page") || "";
                }

                break;

            case item.includes('; rel="last"'):
                pagination.last = item.replace('; rel="last"', "");
                searchParams = new URLSearchParams(pagination.last);

                let lastPage = searchParams.get("page") || "";

                pagination.lastPage = +lastPage || 1;

                if (lastPage != "first") {
                    pagination.lastBookmark = lastPage;
                }

                break;

            case item.includes('; rel="first"'):
                pagination.first = item.replace('; rel="first"', "");

                break;

            case item.includes('; rel="prev"'):
                pagination.prev = item.replace('; rel="prev"', "");

                break;
        }
    }

    return pagination
}