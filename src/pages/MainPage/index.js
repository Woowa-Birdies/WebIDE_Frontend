import React from 'react'
import { useCustomLogin } from '../../hooks/useCustomLogin'
import SideMenu from '../../components/menus/SideMenu'
import { useSelector } from 'react-redux'

export const MainPage = () => {

  const {isLogin, moveToLoginReturn} = useCustomLogin()


  

  if(!isLogin) {
    return moveToLoginReturn()
  }

  return (
    <>
      
    </>
  )
}
