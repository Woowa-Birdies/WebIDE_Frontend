import { Cookies } from "react-cookie";


const cookies = new Cookies()

/**
 * 
 * @param {String} key 
 * @param {String} value - JSON.stringify(값) 으로 문자열로 만들어 전달하면됨.
 * @param {Number} days 
 * @returns 
 */
export const setCookie = (key, value, days = 1) => {
    
    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + days)

    //                 키   값       만료일              쿠키를 쓸 수 있는 경로
    return cookies.set(key, value, {expires: expires, path:'/'})
}


export const getCookie = (key) => {
    return cookies.get(key)
}

export const removeCookie = (key, path = '/') => {
    cookies.remove(key, {path: path})
}