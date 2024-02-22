import axios from "axios"

const rest_api_key = '70373458c672c5a028c1865dc3f3ec21'
const redirect_uri = `${process.env.REACT_APP_REDIRECT_URI}/login/kakao`

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = 'https://kauth.kakao.com/oauth/token'

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL

}

export const getAccessToken = async (authCode) => {

    const header = {headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}}

    const params = {
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header)

    const accessToken = res.data.access_token

    return accessToken
}

export const getMemberWithAccessToken = async (accessToken) => {

    const res = await axios.post(`${process.env.REACT_APP_API_SERVER_HOST}/api/member/kakao`, accessToken,)

    return res.data;
}
