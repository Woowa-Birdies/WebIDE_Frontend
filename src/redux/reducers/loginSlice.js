import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../util/cookieUtil";

const initState = {
    email: ''
}

// export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => { return loginPost(param)
// })

const loadMemberCookie = () => {
    return getCookie('member')
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login....")
            console.log(action.payload)

            setCookie('member', JSON.stringify(action.payload), 1)

            localStorage.setItem('member', JSON.stringify(action.payload))

            console.log(getCookie('member'))

            return action.payload
        },
        logout: () => {
            console.log("logout...")

            removeCookie('member')

            localStorage.setItem('member', JSON.stringify([]))
            localStorage.clear()

            return {...initState}
        },
    }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer