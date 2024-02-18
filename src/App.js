import "./App.css";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { MyPage } from "./pages/MyPage";
import { LoginLoadingPage } from "./pages/LoginLandingPage/loadingPage";
import { LoginLoadingPage2 } from "./pages/LoginLandingPage/loadingPage2";

import SideMenu from "./components/menus/SideMenu";
import ChatPage from "./pages/ChatPage/Chat";

import "./index.css";
import { IDEPage } from "./pages/IDEPage";
import { MyProjectPage } from "./pages/MyProjectPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<LoginPage />} />
            <Route path="login/kakao" element={<LoginLoadingPage />} />
            <Route path="login/google" element={<LoginLoadingPage2 />} />
            <Route path="ide" element={<IDEPage />} />
          </Route>

          <Route path="/" element={<SideMenu />}>
            <Route index element={<MainPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="projects" element={<MyProjectPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
