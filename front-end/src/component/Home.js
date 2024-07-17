import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function Home() {
  const { setTab } = useContext(UserContext);
  const Navigates = useNavigate();
  const cookies = new Cookies();
  const [training, setTraining] = useState([]);
  const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const ViewAvailable = async () => {
    try {
      const response = await axios.get("/userCourse");
      if (response.data.status) {
        setTraining(response.data.courseData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!cookies.getAll().token) {
      Navigates("/login");
    } else {
      const user = jwtDecode(cookies.getAll().token);
      if (user.Role) Navigates("/admin");
      else ViewAvailable();
    }
  });

  return (
    <section class="flex">
      <div class="container-fluid">
        <div class="admin-content">
          <div class="admin-left-nav mt-20">
            <ul>
              <li style={{ background: "gray", marginRight: "10px" }}>
                <Link>Available Course</Link>
              </li>
              <li
                style={{ background: "gray", marginRight: "10px" }}
                onClick={async () => {
                  const user = jwtDecode(cookies.getAll().token);
                  try {
                    const response = await axios.post("/studentDelete", {
                      EmailId: user.EmailId,
                      Password: user.Password,
                    });
                    if (response.data.status) {
                      setTab(false);
                      cookies.remove("token");
                      Navigates("/");
                      toast.warning(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                <Link>Delete Account</Link>
              </li>
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {training.length ? (
              training.map((item) => {
                return (
                  <div
                    style={{
                      background: "#DCDCDC",
                      width: "auto",
                      height: "150px",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      margin: "20px",
                      color: "gray",
                      padding: "20px",
                    }}
                  >
                    <h1>{item.name.split("").map((i) => i.toUpperCase())}</h1>
                    <p>Description: {item.description}</p>
                    <p>
                      Starting Date:
                      {`${item.starting_date.split("T")[0].split("-")[2]}-${
                        Month[
                          Number(
                            item.starting_date.split("T")[0].split("-")[1] - 1
                          )
                        ]
                      }-${item.starting_date.split("T")[0].split("-")[0]}`}
                    </p>
                    <p>
                      Ending Date:
                      {`${item.ending_date.split("T")[0].split("-")[2]}-${
                        Month[
                          Number(
                            item.ending_date.split("T")[0].split("-")[1] - 1
                          )
                        ]
                      }-${item.ending_date.split("T")[0].split("-")[0]}`}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No Training Available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
