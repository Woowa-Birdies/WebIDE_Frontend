import './App.css';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'
import { MyPage } from './pages/MyPage'
import { LoginLoadingPage } from './pages/LoginLandingPage/loadingPage';
import ChatPage from './pages/ChatPage/Chat';
const Layout = () => {
  return (
    <div>
      {/* <Nav/> */}

      <Outlet />

    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<LoginPage />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/login/kakao' element={<LoginLoadingPage/>} />
            <Route path='/mypage' element={<MyPage/>} />
            <Route path='/chat' element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
