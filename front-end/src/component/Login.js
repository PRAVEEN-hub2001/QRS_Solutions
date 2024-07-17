import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function Login() {
  const Navigates = useNavigate();
  const { setTab } = useContext(UserContext);
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState("");
  const cookies = new Cookies();
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login", {
        EmailId: inputEmail,
        Password: inputPassword,
      });
      if (response.data.token) {
        cookies.set("token", response.data.token, {
          maxAge: 1800,
        });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTab(true);
        setTimeout(() => {
          Navigates("/");
        }, 5000);
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      toast.error("Login Failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (cookies.getAll().token) {
      Navigates("/");
    }
  });
  return (
    <div class="form-container sign-up-container">
      <form action="#" onSubmit={login}>
        <h1>Login</h1>
        <div class="form-control">
          <label for="name">Email Address</label>
          <input
            type="email"
            placeholder=""
            defaultValue=""
            required
            value={inputEmail}
            onChange={(e) => {
              setinputEmail(e.target.value);
            }}
          ></input>
        </div>
        <div class="form-control">
          <label for="name">Enter Password</label>
          <input
            type="password"
            placeholder=""
            defaultValue=""
            required
            value={inputPassword}
            onChange={(e) => {
              setinputPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          class="button button--hollow justify-end inline-block"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
