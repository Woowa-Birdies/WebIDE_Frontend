import { removeCookie, setCookie } from "../util/cookieUtil";
import jwtAxios from "../util/jwtUtil";


export const modifyMember = async (member) => {

    const res = await jwtAxios.put(`${process.env.REACT_APP_API_SERVER_HOST}/api/member`, member, )

    setCookie('member', JSON.stringify(res.data), 1)
    localStorage.setItem('member', JSON.stringify(res.data))

    return res.data;
}

export const deleteMember = async (member) => {

    const res = await jwtAxios.post(`${process.env.REACT_APP_API_SERVER_HOST}/api/member/delete?email=${member.email}`, )

    res && logoutHere()
}

const logoutHere = () => {
    removeCookie('member')

    localStorage.setItem('member', JSON.stringify([]))
    localStorage.clear()
    window.location.href="/"
}