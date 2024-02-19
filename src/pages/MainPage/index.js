import React, { useEffect } from "react";
import { useCustomLogin } from "../../hooks/useCustomLogin";

export const MainPage = () => {
  const { isLogin, moveToLoginReturn, moveToPath } = useCustomLogin();

  useEffect(() => {
    if (!isLogin) {
      return moveToLoginReturn();
    } else if (isLogin) {
      return moveToPath('/projects')
    }
  })
  



  return <></>;
};
