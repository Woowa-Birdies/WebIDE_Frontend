import React from "react";
import { useCustomLogin } from "../../hooks/useCustomLogin";

export const MainPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn();
  }

  return <></>;
};
