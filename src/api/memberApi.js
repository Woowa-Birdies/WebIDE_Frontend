import axios from "axios";
import jwtAxios from "../util/jwtUtil";

const header = {headers: {"Content-Type": "application/json;charset=utf-8", "Authorization":`Bearer `}}

export const modifyMember = async (member) => {
    console.log('member', member)
    const header = {headers: {"Authorization":`Bearer ${member.accessToken}`}}

    const res = await jwtAxios.put(`${process.env.REACT_APP_API_SERVER_HOST}/api/member/update`, member, header)

    return res.data;
    
}