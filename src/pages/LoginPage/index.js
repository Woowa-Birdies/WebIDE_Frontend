import React, { useEffect } from "react";
import styled from "styled-components";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import { getGoogleLoginLink } from "../../api/googleApi";
import googleLogo from "../../assets/images/googlelogo.png";
import kakaoLogo from "../../assets/images/kakaologo.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7fafc;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 24rem;
  // border: 1px solid red;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledButton = styled(({ bgColor, hoverBgColor, ...props }) => (
  <a {...props} />
))`
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: #ffffff;
  background-color: ${(props) => props.bgColor};
  &:hover {
    background-color: ${(props) => props.hoverBgColor};
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  }
  & > img {
    margin-right: 0.5rem;
  }
`;

const kakaoOauthLink = getKakaoLoginLink();
const googleOauthLink = getGoogleLoginLink();

export const LoginPage = () => {
  useEffect(() => {
    // sendData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <Container>
        <Card>
          <Title>Login / Sign Up</Title>
          <div>
            <StyledButton
              href={googleOauthLink}
              bgColor="#1a73e8"
              hoverBgColor="#2c66a3"
            >
              <img
                src={googleLogo}
                alt="Google logo"
                style={{ width: "30px" }}
              />
              Login with Google
            </StyledButton>
            <StyledButton
              href={kakaoOauthLink}
              bgColor="#fee500"
              hoverBgColor="#e6c300"
            >
              <img src={kakaoLogo} alt="Kakao logo" style={{ width: "30px" }} />
              Login with Kakao
            </StyledButton>
          </div>
        </Card>
      </Container>
    </>
  );
};
