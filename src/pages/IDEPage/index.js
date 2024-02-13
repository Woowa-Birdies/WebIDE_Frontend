import React from 'react'
import { FileTree } from './FileTree'
import { Terminal } from './Terminal'
import { useCustomLogin } from '../../hooks/useCustomLogin'


export const IDEPage = () => {

  const {isLogin, moveToLoginReturn} = useCustomLogin()

  if(!isLogin) {
    return moveToLoginReturn()
  }

  return (
    <div>
      IDEPage
      <Terminal />
      <FileTree />
    </div>
  )
}
