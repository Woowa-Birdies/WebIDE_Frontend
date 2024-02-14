import axios from "axios"

const redirect_uri = 'http://localhost:3000/login/google'
const client_id = '897204801280-mtqigvolf1hqt41nvt390prsopj4ks88.apps.googleusercontent.com'
const client_secret = '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'

const auth_code_path = 'https://accounts.google.com/o/oauth2/v2/auth'

const access_token_url = 'https://oauth2.googleapis.com/token'

const member_info_url = `${process.env.REACT_APP_API_SERVER_HOST}/api/member/google`

export const getGoogleLoginLink = () => {
    const googleURL = `${auth_code_path}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email profile`

    return googleURL
}

export const getGoogleAccessToken = async (code) => {
    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}}

    const params = {
        grant_type: 'authorization_code',
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: code
    }

    const res = await axios.post(access_token_url, params, header)

    console.log('res')
    console.log(res)

    const resp = {
        accessToken: res.data.access_token,
        scope: res.data.scope
    }

    return resp
}

export const getGoogleMemberWithAccesssToken = async (accessInfo) => {

    const header = {headers: {"Content-Type": "application/json"}}

    const res = await axios.post(member_info_url, accessInfo, )

    return res.data;
}