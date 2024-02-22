import React, { useEffect } from "react";
import { useCustomLogin } from "../../hooks/useCustomLogin";

export const MainPage = () => {
  const { isLogin, moveToLoginReturn, moveToPath } = useCustomLogin();

  console.log('isLogin', isLogin)

  useEffect(() => {
    if (!isLogin) {
      return moveToLoginReturn();
    } else if (isLogin) {
      return moveToPath('/projects')
    }
  })
  



  return <></>;
};
