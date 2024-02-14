import React, { useEffect, useState } from 'react'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/loginSlice'
import { useCustomLogin } from '../../hooks/useCustomLogin'
import { getGoogleAccessToken, getGoogleMemberWithAccesssToken } from '../../api/googleApi'

export const LoginLoadingPage2 = () => {

  const [searchParams] = useSearchParams()

  const {isLogin, moveToPath, moveToLoginReturn} = useCustomLogin()

  const code = searchParams.get('code')

  const dispatch = useDispatch()


  useEffect(() => {
    getGoogleAccessToken(code).then(resp => {
        console.log('resp', resp)

        getGoogleMemberWithAccesssToken(resp).then(memberInfo => {
            console.log('---------')
            console.log(memberInfo)

            dispatch(login(memberInfo))

            if (memberInfo) {
                moveToPath("/")
            }
        })
    })
      
  }, [code])

  return (
    <div>
      <div>로딩중</div>
      <div></div>
    </div>
  )
}
