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

import "./index.css";
import { IDEPage } from "./pages/IDEPage";

const Layout = () => {
  return (
    <div>
      {/* <Nav/> */}

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login/kakao" element={<LoginLoadingPage />} />
            <Route path="/mypage" element={<MyPage />} />

            <Route path="/ide" element={<IDEPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
