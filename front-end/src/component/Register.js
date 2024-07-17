import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function Register() {
  const { setTab } = useContext(UserContext);
  const [Name, setName] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const cookies = new Cookies();
  const Navigates = useNavigate();
  const signup = async (event) => {
    event.preventDefault();
    if (Password === ConfirmPassword) {
      try {
        const response = await axios.post("/signup", {
          Name: Name,
          EmailId: Email,
          Password: Password,
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
        toast.error("Register Failed!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.warning("Both Password and Confirm Password are Not same !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    console.log(cookies.getAll().token);
    if (cookies.getAll().token) {
      Navigates("/");
    }
  });
  return (
    <div class="form-container sign-up-container">
      <form action="#" onSubmit={signup}>
        <h1>Create Account</h1>
        <div class="form-control">
          <label for="name">Name</label>
          <input
            type="text"
            placeholder=""
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div class="form-control">
          <label for="name">Email Address</label>
          <input
            type="email"
            placeholder=""
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div class="form-control">
          <label for="name">Enter Password</label>
          <input
            type="password"
            placeholder=""
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div class="form-control">
          <label for="name">Confirm Password</label>
          <input
            type="password"
            placeholder=""
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></input>
        </div>
        <button class="button checkout_btn button--hollow" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
