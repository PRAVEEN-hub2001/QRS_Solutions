import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Course() {
  const [CreateCourse, setCreateCourse] = useState({
    Name: "",
    Description: "",
  });
  const [CourseTab, setCourseTab] = useState({
    create: false,
    view: true,
    update: false,
  });
  const [ViewCourse, setViewCourse] = useState([]);
  const [updateid, setUpdateId] = useState(null);
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const create = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/courseCreate", CreateCourse);
      if (response.data.status) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCreateCourse({ Name: "", Description: "" });
        View();
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
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/updateCourse/${updateid}`,
        CreateCourse
      );
      if (response.data.status) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCreateCourse({ Name: "", Description: "" });
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
      const response = await axios.get("/courseView");
      if (response.data.status) {
        setViewCourse(response.data.courseData);
      }
    } catch (err) {}
  };

  const CourseDelete = async (id) => {
    try {
      const response = await axios.delete(`/deletecourse/${id}`);
      if (response.data.status) {
        View();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    View();
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
          Create Course
        </button>
        <button
          class="button button--hollow justify-end inline-block"
          type="submit"
          onClick={() => {
            setCourseTab({ view: true, create: false, update: false });
          }}
        >
          View Course
        </button>
      </div>
      {(CourseTab.create || CourseTab.update) && (
        <div class="form-container sign-up-container" style={{ width: "100%" }}>
          <form
            action="#"
            onSubmit={CourseTab.create ? create : update}
            style={{ background: "#F5F5DC" }}
          >
            <h1>{CourseTab.create ? "CREATE " : "UPDATE "}COURSE</h1>
            <div class="form-control">
              <label for="name">Course Name</label>
              <input
                type="text"
                value={CreateCourse.Name}
                onChange={(e) => {
                  setCreateCourse({ ...CreateCourse, Name: e.target.value });
                }}
                required
              ></input>
            </div>
            <div class="form-control">
              <label for="name">Course Description</label>
              <textarea
                rows={6}
                value={CreateCourse.Description}
                onChange={(e) => {
                  setCreateCourse({
                    ...CreateCourse,
                    Description: e.target.value,
                  });
                }}
                required
              ></textarea>
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
            <h1>COURSE VIEW</h1>
            {ViewCourse.length ? (
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {ViewCourse.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{capitalizeFirstLetter(item.name)}</td>
                      <td>{capitalizeFirstLetter(item.description)}</td>
                      <th>
                        <button
                          class="button button--hollow justify-end inline-block"
                          onClick={() => {
                            setCourseTab({
                              view: false,
                              create: false,
                              update: true,
                            });
                            setCreateCourse({
                              Name: item.name,
                              Description: item.description,
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
