import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Schedule() {
  const [trainingSchedule, setTrainingSchedule] = useState({
    course_id: "",
    starting_date: "",
    ending_date: "",
  });
  const [CourseTab, setCourseTab] = useState({
    create: false,
    view: true,
    update: false,
  });
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
  const [selectOption, setSelectOption] = useState([]);
  const [ViewCourse, setViewCourse] = useState([]);
  const [updateid, setUpdateId] = useState(null);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const create = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/scheduleCreate", trainingSchedule);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTrainingSchedule({
          course_id: "",
          starting_date: "",
          ending_date: "",
        });
        View();
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      toast.error("Creation Failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/updateSchedule/${updateid}`,
        trainingSchedule
      );
      if (response.data.status) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTrainingSchedule({
          course_id: "",
          starting_date: "",
          ending_date: "",
        });
        setCourseTab({ view: true, create: false, update: false });
        View();
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      toast.error("Update Failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const View = async () => {
    try {
      const response = await axios.get("/scheduleView");
      if (response.data.status) {
        setViewCourse(response.data.courseData);
      }
    } catch (err) {}
  };

  const CourseDelete = async (id) => {
    try {
      const response = await axios.delete(`/deleteSchedule/${id}`);
      if (response.data.status) {
        View();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Option = async () => {
    try {
      const response = await axios.get("/courseView");
      if (response.data.status) {
        setSelectOption(response.data.courseData);
      }
    } catch (err) {}
  };

  useEffect(() => {
    View();
    Option();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "600px",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "100%",
          padding: "10px",
        }}
      >
        <button
          class="button button--hollow justify-end inline-block"
          style={{ marginRight: "40px" }}
          type="submit"
          onClick={() => {
            setCourseTab({ view: false, create: true, update: false });
          }}
        >
          Training Schedule
        </button>
        <button
          class="button button--hollow justify-end inline-block"
          type="submit"
          onClick={() => {
            setCourseTab({ view: true, create: false, update: false });
          }}
        >
          View Schedule
        </button>
      </div>
      {(CourseTab.create || CourseTab.update) && (
        <div class="form-container sign-up-container" style={{ width: "100%" }}>
          <form
            action="#"
            onSubmit={CourseTab.create ? create : update}
            style={{ background: "#F5F5DC" }}
          >
            <h1>{CourseTab.create ? "CREATE " : "UPDATE "}SCHEDULE</h1>

            <div class="form-control">
              <label for="name">Course</label>
              <select
                value={trainingSchedule.course_id}
                onChange={(e) => {
                  setTrainingSchedule({
                    ...trainingSchedule,
                    course_id: e.target.value,
                  });
                }}
              >
                {selectOption.map((item) => {
                  return (
                    <option value={item.id}>
                      {capitalizeFirstLetter(item.name)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="form-control">
              <label for="name">Starting Date</label>
              <input
                type="date"
                min={
                  new Date().getFullYear() +
                  "-" +
                  ("0" + (new Date().getMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + new Date().getDate()).slice(-2)
                }
                value={trainingSchedule.starting_date.split("T")[0]}
                required
                onChange={(e) => {
                  setTrainingSchedule({
                    ...trainingSchedule,
                    starting_date: e.target.value,
                  });
                }}
              ></input>
            </div>
            <div class="form-control">
              <label for="name">Ending Date</label>
              <input
                type="date"
                min={trainingSchedule.starting_date.split("T")[0]}
                value={trainingSchedule.ending_date.split("T")[0]}
                required
                onChange={(e) => {
                  setTrainingSchedule({
                    ...trainingSchedule,
                    ending_date: e.target.value,
                  });
                }}
              ></input>
            </div>
            <button
              class="button button--hollow justify-end inline-block"
              type="submit"
            >
              {CourseTab.create ? "CREATE" : "UPDATE"}
            </button>
          </form>
        </div>
      )}
      {CourseTab.view && (
        <div
          class="form-container sign-up-container"
          style={{ background: "#F5F5DC", padding: "15px" }}
        >
          <div class="added-products">
            <h1>View Schedule</h1>
            {ViewCourse.length ? (
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {ViewCourse.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{capitalizeFirstLetter(item.name)}</td>
                      <td>
                        {`${item.starting_date.split("T")[0].split("-")[2]}-${
                          Month[
                            Number(
                              item.starting_date.split("T")[0].split("-")[1] - 1
                            )
                          ]
                        }-${item.starting_date.split("T")[0].split("-")[0]}`}
                      </td>
                      <td>{`${item.ending_date.split("T")[0].split("-")[2]}-${
                        Month[
                          Number(
                            item.ending_date.split("T")[0].split("-")[1] - 1
                          )
                        ]
                      }-${item.ending_date.split("T")[0].split("-")[0]}`}</td>
                      <th>
                        <button
                          class="button button--hollow justify-end inline-block"
                          onClick={() => {
                            setCourseTab({
                              view: false,
                              create: false,
                              update: true,
                            });
                            setTrainingSchedule({
                              course_id: item.course_id,
                              starting_date: item.starting_date,
                              ending_date: item.ending_date,
                            });
                            setUpdateId(item.id);
                          }}
                        >
                          Edit
                        </button>
                      </th>
                      <th>
                        <button
                          class="button button--hollow justify-end inline-block"
                          onClick={() => CourseDelete(item.id)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "No Data Available"
            )}
          </div>
        </div>
      )}
    </div>
  );
}
