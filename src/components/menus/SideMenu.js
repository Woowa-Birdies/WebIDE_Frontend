import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Popover, theme } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { useCustomLogin } from '../../hooks/useCustomLogin';


const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('홈', '1', <DesktopOutlined />),
  getItem('마이페이지', '2', <UserOutlined />),
];

const initState = {
  email: '',
  pwd: '',
  nickname: '',
}

const SideMenu = () => {

  const loginInfo = useSelector(state => state.loginSlice)

  const {moveToPath, doLogout} = useCustomLogin()

  const [member, setMember] = useState(initState)

  const [collapsed, setCollapsed] = useState(false);

  const [pathKey, setPathKey] = useState([])

  const {pathname} = useLocation()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePath = (e) => {
    if (e.key === '1') {
      moveToPath('/')
    } else if (e.key === '2') {
      moveToPath('/mypage')
    }
  }

  useEffect(() => {
    setMember({...loginInfo, pwd: '****'})
    if (pathname === '/mypage') {
      setPathKey(['2'])
    } else if (pathname === '/') {
      setPathKey(['1'])
    }
  }, [loginInfo, pathname])

  console.log(loginInfo.accessToken)

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div 
          className="demo-logo-vertical" 
          style={{
            cursor: 'pointer',
            margin:'16px 16px', 
            backgroundColor:'#444e5e', 
            height:'35px', 
            lineHeight:'35px', 
            borderRadius:'8px',
            color: '#fff'
          }} 
          onClick={() => moveToPath('/')}
        >
          Web IDE
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} selectedKeys={pathKey} onClick={handlePath}/>
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            padding: 0,
            background: colorBgContainer,
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: '16px',
            }}
          >
            <Popover placement="bottom" content={'로그아웃'} >
              <Button type="text" icon={<LogoutOutlined />} onClick={() => doLogout()} />
            </Popover>
            <Popover placement="bottom" content={member.email} >
              <Avatar style={{margin:'auto 10px'}}>{member.nickname[0]}</Avatar>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div style={{ margin: '16px 0'}}></div>
          <div
            style={{
              padding: 24,
              // minHeight: 360,
              minHeight: 'calc(100vh - 96px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

            <Outlet/>

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default SideMenu;