import { useContext, useEffect } from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
export default function Header() {
  const { tab, setTab } = useContext(UserContext);
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.getAll().token) {
      setTab(true);
    }
  }, []);
  return (
    <header class="header bg-white" id="header">
      <div class="container">
        <div class="page-header">
          <div class="header-left">
            <nav class="navigation">
              <ul>
                <li>
                  <Link href="collection" to={"/"}>
                    Training Platform
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="header-right">
            <div class="header-items">
              <span class="sign-in">
                <svg width="22px" height="22px" viewBox="-1 -1 21 20">
                  <g
                    transform="translate(0.968750, -0.031250)"
                    stroke="none"
                    stroke-width="1"
                    fill="currentColor"
                    fill-rule="nonzero"
                  >
                    <path d="M9,7.5 C10.704,7.5 12.086,6.157 12.086,4.5 C12.086,2.843 10.704,1.5 9,1.5 C7.296,1.5 5.914,2.843 5.914,4.5 C5.914,6.157 7.296,7.5 9,7.5 Z M9,9 C6.444,9 4.371,6.985 4.371,4.5 C4.371,2.015 6.444,0 9,0 C11.556,0 13.629,2.015 13.629,4.5 C13.629,6.985 11.556,9 9,9 Z M1.543,18 L0,18 L0,15 C0,12.377 2.187,10.25 4.886,10.25 L14.143,10.25 C16.273,10.25 18,11.929 18,14 L18,18 L16.457,18 L16.457,14 C16.457,12.757 15.421,11.75 14.143,11.75 L4.886,11.75 C3.04,11.75 1.543,13.205 1.543,15 L1.543,18 Z"></path>
                  </g>
                </svg>
                <div class="head-link bg-white">
                  {!tab && <Link to={"/register"}>Register</Link>}
                  {!tab && (
                    <Link class="main-menu-link" to={"/login"}>
                      Login
                    </Link>
                  )}
                  {tab && (
                    <Link
                      to={"/login"}
                      onClick={() => {
                        cookies.remove("token");
                        setTab(false);
                        toast.success(`Successfully Logout !`, {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      }}
                    >
                      Logout
                    </Link>
                  )}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
