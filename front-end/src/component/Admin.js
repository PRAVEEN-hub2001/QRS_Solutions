import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Course from "./Course";
import Schedule from "./Schedule";

export default function Admin() {
  const [tab, setTab] = useState(true);

  const Navigates = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    if (!cookies.getAll().token) {
      Navigates("/login");
    }
  });
  return (
    <section class="flex">
      <div class="container-fluid">
        <div class="admin-content">
          <div class="admin-left-nav mt-20">
            <ul>
              <li
                style={{ background: "gray", marginRight: "10px" }}
                onClick={() => {
                  setTab(true);
                }}
              >
                <Link>Course</Link>
              </li>
              <li
                style={{ background: "gray", marginRight: "10px" }}
                onClick={() => {
                  setTab(false);
                }}
              >
                <Link>Training Schedule</Link>
              </li>
            </ul>
          </div>
          {tab ? <Course /> : <Schedule />}
        </div>
      </div>
    </section>
  );
}
