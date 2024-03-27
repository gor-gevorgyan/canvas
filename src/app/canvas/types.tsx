export type CanvasAPI = {
    clientID: string
    clientSecret: string
}

export type CustomData = {
    account_name: string
    canvas_user_id: string
    canvas_course_id: string
    membership_roles: string
    canvas_account_id: string
    canvas_api_domain: string
    external_tool_url: string
    launch_presentation_locale: string
    canvas_root_account_id: string
    canvas_root_account_uuid: string
    canvas_course_section_ids: string
}

export type Login = {
    iss: string,
    login_hint: string,
    client_id: string,
    lti_message_hint: string,
}

export type JWK = {
    keys: JWKData[]
}

type JWKData = {
    kty: string,
    e: string,
    n: string,
    kid: string,
    alg: string,
    use: string
}