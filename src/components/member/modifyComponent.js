import { Button, Flex, Image, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';

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
  // border: 1px solid red;
`;

const initState = {
    email: '',
    pwd: '',
    nickname: '',
}

export const ModifyComponent = () => {

    const [member, setMember] = useState(initState)

    const [loadings, setLoadings] = useState([]);

    const loginInfo = useSelector(state => state.loginSlice)

    useEffect(() => {
        setMember({...loginInfo, pwd: '****'})
    }, [loginInfo])

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
        }, 6000);
      };
    
    const handleChange = (e) => {

        member[e.target.name] = e.target.value

        setMember({...member})
    }

    return (
        <Container>
            <Card>
              <Flex gap="small" align="center" wrap="wrap" vertical="true">
              <Image
                  style={{ borderRadius:'50%' }}
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <p></p>
              이메일
              <Input value={member.email} variant='filled' />
              닉네임
              <Input value={member.nickname} variant='filled' />
              <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                  수정하기
              </Button>
              <Button danger type="text">
                  탈퇴하기
              </Button>
              </Flex>
            </Card>
        </Container>
  )
}
