import React, { useEffect } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/loginSlice";
import { useCustomLogin } from "../../hooks/useCustomLogin";
import { Spin } from "antd";

export const LoginLoadingPage = () => {
  const [searchParams] = useSearchParams();

  const { isLogin, moveToPath, moveToLoginReturn } = useCustomLogin();

  const authCode = searchParams.get("code");

  const dispatch = useDispatch();

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("-------------------------");
        console.log(memberInfo);

        dispatch(login(memberInfo));

        if (memberInfo) {
          moveToPath("/projects");
        }
      });
    });
  }, [authCode]);

  return (
    <Spin style={{ top: "30vh" }} tip="Loading..." size="large">
      <div className="content" />
    </Spin>
  );
};
