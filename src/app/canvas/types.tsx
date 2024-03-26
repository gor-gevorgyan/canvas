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