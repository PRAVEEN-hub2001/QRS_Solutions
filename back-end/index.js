const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const server = express();
const router = express.Router();
dotenv.config({ path: "./config.env" });

router.use(cookieParser());
server.use(express.json());
server.use(cors());

const {
  studentSignin,
  studentSignup,
  courseCreate,
  getAllcourse,
  deletecourse,
  updatecourse,
  createschedule,
  getAllschedule,
  updateschedule,
  deleteschedule,
  availableCourse,
  deleteStudent,
} = require("./Route/api");

router.route("/signup").post(studentSignup);
router.route("/login").post(studentSignin);
router.route("/courseCreate").post(courseCreate);
router.route("/courseView").get(getAllcourse);
router.route("/updateCourse/:id").put(updatecourse);
router.route("/deletecourse/:id").delete(deletecourse);
router.route("/scheduleCreate").post(createschedule);
router.route("/scheduleView").get(getAllschedule);
router.route("/updateSchedule/:id").put(updateschedule);
router.route("/deleteSchedule/:id").delete(deleteschedule);
router.route("/userCourse").get(availableCourse);
router.route("/studentDelete").post(deleteStudent);
server.use("/", router);

server.listen(process.env.PORT || 8000, "127.0.0.1", () => {
  console.log("Server Is Running on 8000");
});
