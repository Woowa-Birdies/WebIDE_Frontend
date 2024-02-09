import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getKakaoLoginLink } from '../../api/kakaoApi';
import { Avatar } from 'antd';

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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 24rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledButton = styled.a`
  text-align: center;
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: #ffffff;
  background-color: ${props => props.bgColor};
  &:hover {
    background-color: ${props => props.hoverBgColor};
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  }
  & > img {
    margin-right: 0.5rem;
  }
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const FooterLink = styled.a`
  color: #4299e1;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const link = getKakaoLoginLink()

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

export const LoginPage = () => {

  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);


  useEffect(() => {  

    // sendData();
    
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <>
    {/* <Avatar style={{ backgroundColor: 'orange', verticalAlign: 'middle' }} size="large" gap={gap}>
        {user}
      </Avatar> */}
    <Container>
      <Card>
        <Title>Login</Title>
        <div>
          <StyledButton
            href="#"
            bgColor="#1a73e8"
            hoverBgColor="#2c66a3"
          >
            <img src="https://placehold.co/20x20" alt="Google logo" />
            Login with Google
          </StyledButton>
          <StyledButton
            // onClick={test}
            bgColor="#333333"
            hoverBgColor="#1a1a1a"
          >
            <img src="https://placehold.co/20x20" alt="GitHub logo" />
            Login with Github
          </StyledButton>
          <StyledButton
            href={link}
            bgColor="#fee500"
            hoverBgColor="#e6c300"
          >
            <img src="https://placehold.co/20x20" alt="Kakao logo" />
            {/* <Link to={link}> */}
              Login with Kakao
              {/* </Link> */}
          </StyledButton>
        </div>
        <FooterText>
          You don’t have an account? <FooterLink href="#">Sign up</FooterLink>
        </FooterText>
      </Card>
    </Container>
    </>
  );
};
