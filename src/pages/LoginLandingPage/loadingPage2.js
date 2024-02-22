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
        getGoogleMemberWithAccesssToken(resp.accessToken).then(memberInfo => {

            dispatch(login(memberInfo))

            if (memberInfo) {
                moveToPath("/projects")
            }
        })
    })
      
  }, [code])

  return (
    <Spin style={{top:'40vh'}} tip="Loading..." size="large">
      <div className="content" />
    </Spin>
  )
}
