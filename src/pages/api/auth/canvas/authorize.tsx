import { NextApiRequest, NextApiResponse } from 'next';
import { JWKS } from "../../../../app/canvas";
import { promisify } from 'util';

const jwkToPem = require('jwk-to-pem');

const jwt = require('jsonwebtoken');

type ResponseData = {
    success: boolean
    data?: any
}

type Body = {
    id_token: string,
}

interface Request extends NextApiRequest {
    // let's say our request accepts name and age property
    body: Body
}

export default async function handler(request: Request, response: NextApiResponse<ResponseData>) {
    if (request.method !== "POST") {
        const publicKey = jwkToPem({"kty":"RSA","e":"AQAB","n":"73qX5ODdIlza9DmQaF-7aiD0jnGsnJTVZ2agVRdiA5CAYHzthjFHKKkvI04O85Vgh55GAqaLtdBktmcu4-_qOa4A3rdu4rMURSAUDAzlb5Szn1NyiNUrTkc7oFFotVsWgDhgvKKKf_16vGOwvSVxNORGr02lafvKaK_B8QTTWOieb1Xu2VAaGJLRtqb8EYTk1RJJWF0D5hIpWOuB8AyiZycYBAwr_o0v4bK-VevlLNZO2jlneZPVPKGbLp3nDN8zC5yVK5VPwcXRv_WSIa2bsHPp8dT-a4A1GWxjQ4NC5Ur5W0vx2Aoey4dAnsf00byX7FFc5IQ-nqcZYgkQADudrw","kid":"2024-01-01T00:00:01Z_83175c01-473f-44d2-9268-7194dc9609b8","alg":"RS256","use":"sig"});
console.log(3333, publicKey)
        let c = jwt.verify("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjIwMjQtMDItMDFUMDA6MDA6MDRaXzIyYTExNWYwLWVkYjgtNGU2OC1hMTdmLTUxMzRhMjRiZWVkZiJ9.eyJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9tZXNzYWdlX3R5cGUiOiJMdGlSZXNvdXJjZUxpbmtSZXF1ZXN0IiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vdmVyc2lvbiI6IjEuMy4wIiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vcmVzb3VyY2VfbGluayI6eyJpZCI6ImM0MDA5YzE5ODk1MjEwODc3ZTJmMDQ4MDgwYzE2NTJhMWEzOWVhZTAiLCJkZXNjcmlwdGlvbiI6bnVsbCwidGl0bGUiOiJDYW52YXMgMTAxIiwidmFsaWRhdGlvbl9jb250ZXh0IjpudWxsLCJlcnJvcnMiOnsiZXJyb3JzIjp7fX19LCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS1hZ3MvY2xhaW0vZW5kcG9pbnQiOnsic2NvcGUiOlsiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktYWdzL3Njb3BlL2xpbmVpdGVtIiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktYWdzL3Njb3BlL3Jlc3VsdC5yZWFkb25seSIsImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpLWFncy9zY29wZS9zY29yZSIsImh0dHBzOi8vcHVybC5pbXNnbG9iYWwub3JnL3NwZWMvbHRpLWFncy9zY29wZS9saW5laXRlbS5yZWFkb25seSJdLCJsaW5laXRlbXMiOiJodHRwczovL2Fzc2lnbmd1YXJkLmluc3RydWN0dXJlLmNvbS9hcGkvbHRpL2NvdXJzZXMvMi9saW5lX2l0ZW1zIiwidmFsaWRhdGlvbl9jb250ZXh0IjpudWxsLCJlcnJvcnMiOnsiZXJyb3JzIjp7fX19LCJhdWQiOiIyMzcxODAwMDAwMDAwMDAwMDMiLCJhenAiOiIyMzcxODAwMDAwMDAwMDAwMDMiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9kZXBsb3ltZW50X2lkIjoiMjE0OmM0MDA5YzE5ODk1MjEwODc3ZTJmMDQ4MDgwYzE2NTJhMWEzOWVhZTAiLCJleHAiOjE3MTE0NzIwMDcsImlhdCI6MTcxMTQ2ODQwNywiaXNzIjoiaHR0cHM6Ly9jYW52YXMuaW5zdHJ1Y3R1cmUuY29tIiwibm9uY2UiOiIwZWM4MmJiNi1iOTZjLTRiODYtYmE0Zi1lMzc5YjA0ZmY1Y2QiLCJzdWIiOiI3NGY2YTBlNC03YzIyLTQwZjAtYjVlOS04NTMzNzQxMTVlMTQiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS90YXJnZXRfbGlua191cmkiOiJodHRwczovL2NhbnZhcy1sdGkubmV0bGlmeS5hcHAvYXBpL2F1dGgvY2FudmFzL2x0aSIsInBpY3R1cmUiOiJodHRwczovL2NhbnZhcy5pbnN0cnVjdHVyZS5jb20vaW1hZ2VzL21lc3NhZ2VzL2F2YXRhci01MC5wbmciLCJlbWFpbCI6ImdvcjkyZ2V2b3JneWFuQGdtYWlsLmNvbSIsIm5hbWUiOiJHb3IiLCJnaXZlbl9uYW1lIjoiR29yIiwiZmFtaWx5X25hbWUiOiIiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9saXMiOnsicGVyc29uX3NvdXJjZWRpZCI6bnVsbCwiY291cnNlX29mZmVyaW5nX3NvdXJjZWRpZCI6bnVsbCwidmFsaWRhdGlvbl9jb250ZXh0IjpudWxsLCJlcnJvcnMiOnsiZXJyb3JzIjp7fX19LCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9jb250ZXh0Ijp7ImlkIjoiYzQwMDljMTk4OTUyMTA4NzdlMmYwNDgwODBjMTY1MmExYTM5ZWFlMCIsImxhYmVsIjoiQ2FudmFzIDEwMSIsInRpdGxlIjoiQ2FudmFzIDEwMSIsInR5cGUiOlsiaHR0cDovL3B1cmwuaW1zZ2xvYmFsLm9yZy92b2NhYi9saXMvdjIvY291cnNlI0NvdXJzZU9mZmVyaW5nIl0sInZhbGlkYXRpb25fY29udGV4dCI6bnVsbCwiZXJyb3JzIjp7ImVycm9ycyI6e319fSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vdG9vbF9wbGF0Zm9ybSI6eyJndWlkIjoicHZoYlhsVDIyVm13QU5yYzVqQUpNZURnd0h3Vm5UcjZuYU5tQlM3WjpjYW52YXMtbG1zIiwibmFtZSI6IkFzc2lnbkd1YXJkIiwidmVyc2lvbiI6ImNsb3VkIiwicHJvZHVjdF9mYW1pbHlfY29kZSI6ImNhbnZhcyIsInZhbGlkYXRpb25fY29udGV4dCI6bnVsbCwiZXJyb3JzIjp7ImVycm9ycyI6e319fSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vbGF1bmNoX3ByZXNlbnRhdGlvbiI6eyJkb2N1bWVudF90YXJnZXQiOiJpZnJhbWUiLCJyZXR1cm5fdXJsIjoiaHR0cHM6Ly9hc3NpZ25ndWFyZC5pbnN0cnVjdHVyZS5jb20vY291cnNlcy8yL2V4dGVybmFsX2NvbnRlbnQvc3VjY2Vzcy9leHRlcm5hbF90b29sX3JlZGlyZWN0IiwibG9jYWxlIjoiZW4iLCJoZWlnaHQiOjAsIndpZHRoIjowLCJ2YWxpZGF0aW9uX2NvbnRleHQiOm51bGwsImVycm9ycyI6eyJlcnJvcnMiOnt9fX0sImxvY2FsZSI6ImVuIiwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vcm9sZXMiOlsiaHR0cDovL3B1cmwuaW1zZ2xvYmFsLm9yZy92b2NhYi9saXMvdjIvaW5zdGl0dXRpb24vcGVyc29uI0FkbWluaXN0cmF0b3IiLCJodHRwOi8vcHVybC5pbXNnbG9iYWwub3JnL3ZvY2FiL2xpcy92Mi9zeXN0ZW0vcGVyc29uI1VzZXIiXSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGkvY2xhaW0vY3VzdG9tIjp7ImFjY291bnRfbmFtZSI6IkFzc2lnbkd1YXJkIiwiY2FudmFzX3VzZXJfaWQiOiIyMTIiLCJjYW52YXNfY291cnNlX2lkIjoiMiIsIm1lbWJlcnNoaXBfcm9sZXMiOiJBY2NvdW50IEFkbWluIiwiY2FudmFzX2FjY291bnRfaWQiOiIxIiwiY2FudmFzX2FwaV9kb21haW4iOiJhc3NpZ25ndWFyZC5pbnN0cnVjdHVyZS5jb20iLCJleHRlcm5hbF90b29sX3VybCI6Imh0dHBzOi8vYXNzaWduZ3VhcmQuaW5zdHJ1Y3R1cmUuY29tL2FwaS92MS9jb3Vyc2VzLzIvZXh0ZXJuYWxfdG9vbHMvMjE0IiwibGF1bmNoX3ByZXNlbnRhdGlvbl9sb2NhbGUiOiJlbiIsImNhbnZhc19yb290X2FjY291bnRfaWQiOiIxIiwiY2FudmFzX3Jvb3RfYWNjb3VudF91dWlkIjoicHZoYlhsVDIyVm13QU5yYzVqQUpNZURnd0h3Vm5UcjZuYU5tQlM3WiIsImNhbnZhc19jb3Vyc2Vfc2VjdGlvbl9pZHMiOiIifSwiaHR0cHM6Ly9wdXJsLmltc2dsb2JhbC5vcmcvc3BlYy9sdGktbnJwcy9jbGFpbS9uYW1lc3JvbGVzZXJ2aWNlIjp7ImNvbnRleHRfbWVtYmVyc2hpcHNfdXJsIjoiaHR0cHM6Ly9hc3NpZ25ndWFyZC5pbnN0cnVjdHVyZS5jb20vYXBpL2x0aS9jb3Vyc2VzLzIvbmFtZXNfYW5kX3JvbGVzIiwic2VydmljZV92ZXJzaW9ucyI6WyIyLjAiXSwidmFsaWRhdGlvbl9jb250ZXh0IjpudWxsLCJlcnJvcnMiOnsiZXJyb3JzIjp7fX19LCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9sdGkxMV9sZWdhY3lfdXNlcl9pZCI6IjllMzM4ZmY5N2M5ZjdmNGE4ZThiMzdjYTViOWFkM2VhZjJhZTgwYWMiLCJodHRwczovL3B1cmwuaW1zZ2xvYmFsLm9yZy9zcGVjL2x0aS9jbGFpbS9sdGkxcDEiOnsidXNlcl9pZCI6IjllMzM4ZmY5N2M5ZjdmNGE4ZThiMzdjYTViOWFkM2VhZjJhZTgwYWMiLCJ2YWxpZGF0aW9uX2NvbnRleHQiOm51bGwsImVycm9ycyI6eyJlcnJvcnMiOnt9fX0sImVycm9ycyI6eyJlcnJvcnMiOnt9fSwiaHR0cHM6Ly93d3cuaW5zdHJ1Y3R1cmUuY29tL3BsYWNlbWVudCI6ImNvdXJzZV9uYXZpZ2F0aW9uIn0.PIXhknoWFoBeOVYD92W4gOj9fxnsAakdL_Sv2NdTERWfTJafQ7QbdCTxa6A98_XGGwO7QasY3QgcpeO1JEyL1imwPfH7ncPnrmLGV_xifgYxLnit8HO7Uq7p4F3XM1e9j_NPn54Zl0tZqvD2kWBvc7Dbfvgbw91HjfeYr4BWynSJXwCEWkJEHWUeYR517SymN4WCTcC5aOczHcfAnvlaI80TLyKE7r2airt4dTsrw4p4Vjs_E6yq6N-pllM8INy9B8P_t_V7B5DlqC1OgZnEPf4ggUho6974vgakq097QUkazjS39UTohX_Nr0pbrRptItRJVJYVri3znjPg0HypHg", publicKey)

        return response.status(200).json({ success: false, data: c })
    }

    const iss:string = request.query.iss as string;

        let stage: string;

        switch (true) {
            case iss.includes("beta"):
                stage = "beta";

                break;

            case iss.includes("test"):
                stage = "test";

                break;

            default:
                stage = "";
        }

        let key = await JWKS(stage);

        let d:any
        await promisify(jwt.verify)(request.body.id_token, key.keys[0])
            .then((res: any) => {
                d = res
            })
            .catch((err: any) => {
                d = err
            });

        response.status(200).json({ success: true, data: {d:d, i: request.body.id_token, k: key} })
}