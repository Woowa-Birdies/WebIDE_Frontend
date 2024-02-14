import { Button, Flex, Image, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { modifyMember } from '../../api/memberApi';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 96px - 48px);
`;

const Card = styled.div`
  background-color: #ffffff;
  width: 24rem;
`;

const InputWrapper = styled.div`
  display: flex:
  flex-direction: row;
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
        setMember({...loginInfo})
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
        }, 2000);
      };
    
    const handleChange = (e) => {

        member[e.target.name] = e.target.value

        setMember({...member})
        console.log(member.accessToken)
        console.log(loginInfo.pwd)
    }

    const handleClickModify = () => {
      modifyMember(member)
    }

    return (
        <Container>
            <Card>
              <Flex gap="small" align="center" wrap="wrap" vertical="true">
              <Image
                  style={{ borderRadius:'50%' }}
                  width={100}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <p></p>
              <InputWrapper>
                이메일
                <Input name='email' value={member.email} variant='filled' disabled onChange={handleChange}/>
              </InputWrapper>
              <InputWrapper>
                닉네임
                <Input name='nickname' value={member.nickname} variant='filled' disabled onChange={handleChange} />
              </InputWrapper>
              <Button 
                type="primary" 
                loading={loadings[0]} 
                onClick={() => {
                  enterLoading(0);
                  handleClickModify()
                }}
              >
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
