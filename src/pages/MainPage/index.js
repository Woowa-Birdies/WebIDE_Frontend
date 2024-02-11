import React from 'react'
import { useCustomLogin } from '../../hooks/useCustomLogin'
import SideMenu from '../../components/menus/SideMenu'

export const MainPage = () => {

  const {isLogin, moveToLoginReturn} = useCustomLogin()

  if(!isLogin) {
    return moveToLoginReturn()
  }

  return (
    <>
      메인입니다.
    </>
  )
}
