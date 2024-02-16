import React, { useState } from "react";
import { ModifyComponent } from "../../components/member/ModifyComponent";
import { useCustomLogin } from "../../hooks/useCustomLogin";

export const MyPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn();
  }

  return (
    <div>
      <ModifyComponent />
    </div>
  );
};
