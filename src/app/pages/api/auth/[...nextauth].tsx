import NextAuth, { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
    providers: [
        {
            id: "kakao",
            name: "canvas",
            type: "oauth",
            authorization: {
                url: "https://kauth.kakao.com/oauth/authorize",
                params: {
                    scope: [
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
                    ].join(",")
                }
            },
            token: "https://kauth.kakao.com/oauth/token",
            userinfo: "https://kapi.kakao.com/v2/user/me",
            profile(profile: any) {
                return profile;
            },
        }
    ],
}
export default NextAuth(authOptions)