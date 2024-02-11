import { Avatar } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const NavVar = styled.div`
    width: 100%;
    height: 70px;
    border: 1px solid red;
`

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

export const Nav = () => {

    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);

    const loginState = useSelector(state => state.loginSlice)

    console.log("nav: loginState: ",loginState)

    return (
        <>
            <NavVar>
                {loginState.email ?
                    <>
                        <Avatar style={{ backgroundColor: 'orange', verticalAlign: 'middle' }} size="large" gap={gap}>
                            {user}
                        </Avatar>
                    </>
                    :<><Avatar style={{ backgroundColor: 'orange', verticalAlign: 'middle' }} size="large" gap={gap}>
                    {user}
                </Avatar></>
                }
            </NavVar>
        </>
    )
}
