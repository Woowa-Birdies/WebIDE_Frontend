import './App.css';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage'
import { MainPage } from './pages/MainPage'
import { MyPage } from './pages/MyPage'
import { LoginLoadingPage } from './pages/LoginLandingPage/loadingPage';
import SideMenu from './components/menus/SideMenu';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' >
            <Route path='/login' element={<LoginPage />} />
            <Route path='/login/kakao' element={<LoginLoadingPage/>} />
          </Route>
          <Route path='/' element={<SideMenu />} >
            <Route index element={<MainPage />} />
            <Route path='/mypage' element={<MyPage/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
