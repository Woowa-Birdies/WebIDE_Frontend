import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducers/loginSlice'
import { useCustomLogin } from '../../hooks/useCustomLogin'
import { getGoogleAccessToken, getGoogleMemberWithAccesssToken } from '../../api/googleApi'
import { Spin } from 'antd'

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
    <Spin style={{top:'30vh'}} tip="Loading..." size="large">
      <div className="content" />
    </Spin>
  )
}
