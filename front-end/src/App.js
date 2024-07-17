import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import Header from "./component/Header";
import { createContext, useState } from "react";
import Admin from "./component/Admin";
export const UserContext = createContext();
function App() {
  axios.defaults.baseURL = "http://localhost:8000";
  const [tab, setTab] = useState(false);
  return (
    <UserContext.Provider value={{ tab, setTab }}>
      <div className="App">
        <ToastContainer />
        <BrowserRouter>
          <div class="main-content">
            <Header />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
