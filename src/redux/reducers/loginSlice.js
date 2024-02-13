import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../util/cookieUtil";

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

            return action.payload
        },
        logout: () => {
            console.log("logout...")
        },
        // extraReducers: (builder) => {
        //     builder.addCase( loginPostAsync.fulfilled, (state, action) => {
        //         console.log("fulfilled")

        //         const payload = action.payload

        //         if(!payload.error){
        //             setCookie("member", JSON.stringify(payload))
        //         }
        //     })
        //     .addCase(loginPostAsync.pending, (state,action) => {
        //         console.log("pending")
        //     })
        //     .addCase(loginPostAsync.rejected, (state,action) => {
        //         console.log("rejected")
        //     })
        // }
    }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer