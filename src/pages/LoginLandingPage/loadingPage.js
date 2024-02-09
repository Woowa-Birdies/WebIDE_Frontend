import React, { useEffect, useState } from 'react'
import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi'
import { useSearchParams } from 'react-router-dom'

export const LoginLoadingPage = () => {

  const [searchParams] = useSearchParams()

    const authCode = searchParams.get('code')

    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
      getAccessToken(authCode).then(accessToken => {

        getMemberWithAccessToken(accessToken).then(result => {
          console.log("-------------------------")
          console.log(result)
        })

      })
      
    }, [authCode])

  return (
    <div>
      <div>로딩중</div>
      <div></div>
    </div>
  )
}
