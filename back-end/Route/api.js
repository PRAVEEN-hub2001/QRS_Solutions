const { db } = require("../database/DB_Models");
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: "1800s" });
}

const studentSignup = async (req, res) => {
  try {
    const { Name, EmailId, Password } = req.body;
    db.query(
      "INSERT INTO students (name,email,password) VALUES (?,?,?)",
      [Name, EmailId, Password],
      (err, result) => {
        if (err && err.errno === 1062)
          res.json({ message: "You Already Register!" });
        else if (err) res.json({ message: "Register Failed" });
        const token = generateAccessToken({
          EmailId: EmailId,
          Password: Password,
          Role: 0,
        });
        res.json({ message: "Register Successfully", token: token });
      }
    );
  } catch (err) {
    res.json({ message: "Register Failed" });
  }
};

const studentSignin = async (req, res) => {
  try {
    const { EmailId, Password } = req.body;
    db.query(
      `SELECT * FROM students WHERE email = ? AND password = ?`,
      [EmailId, Password],
      (err, result) => {
        if (err) throw err;
        if (!result.length) return res.json({ message: "User Not Found!" });
        const { email, password, role } = result[0];
        const token = generateAccessToken({
          EmailId: email,
          Password: password,
          Role: role,
        });
        res.json({ message: "Login Successfully", token: token });
      }
    );
  } catch (err) {
    res.json({ message: "Login Failed" });
  }
};

const deleteStudent = async (req, res) => {
  const { EmailId, Password } = req.body;
  try {
    db.query(
      "DELETE FROM students WHERE email = ? AND password = ?",
      [EmailId, Password],
      (err, result) => {
        if (err) throw "Deletion error";
        return res.json({ status: true, message: "Your Account Deleted" });
      }
    );
  } catch (err) {
    res.json({ status: false });
  }
};
const courseCreate = async (req, res) => {
  try {
    const { Name, Description } = req.body;
    db.query(
      "INSERT INTO courses (name,description) VALUES (?,?)",
      [Name, Description],
      (err, result) => {
        if (err) throw "creation error";
        res.json({ status: true, message: "Create Successfully" });
      }
    );
  } catch (err) {
    res.json({ status: false, message: "Creation Failed" });
  }
};

const getAllcourse = async (req, res) => {
  try {
    db.query("SELECT * FROM courses", (err, result) => {
      if (err) throw "fetching error";
      return res.json({ status: true, courseData: result });
    });
  } catch (err) {
    res.json({ status: false, courseData: [] });
  }
};

const updatecourse = async (req, res) => {
  const { id } = req.params;
  try {
    const { Name, Description } = req.body;
    db.query(
      "UPDATE courses SET name = ? , description = ? , updated_at =  ?WHERE id = ?",
      [Name, Description, new Date(), id],
      (err, result) => {
        if (err) throw "Update error";
        res.json({ status: true, message: "Updated Successfully" });
      }
    );
  } catch (err) {
    res.json({ status: false, message: "Updation Failed" });
  }
};

const deletecourse = async (req, res) => {
  const { id } = req.params;
  try {
    db.query("DELETE FROM courses WHERE id = ?", [id], (err, result) => {
      if (err) throw "Deletion error";
      return res.json({ status: true });
    });
  } catch (err) {
    res.json({ status: false });
  }
};
const createschedule = async (req, res) => {
  try {
    const { course_id, starting_date, ending_date } = req.body;
    db.query(
      "INSERT INTO training_schedules (course_id,starting_date,ending_date) VALUES (?,?,?)",
      [Number(course_id), starting_date, ending_date],
      (err, result) => {
        if (err) throw "creation error";
        res.json({ status: true, message: "Create Successfully" });
      }
    );
  } catch (err) {
    res.json({ status: false, message: "Creation Failed" });
  }
};

const getAllschedule = async (req, res) => {
  try {
    db.query(
      "SELECT training_schedules.id,training_schedules.starting_date,training_schedules.ending_date,courses.name,courses.description from  courses INNER JOIN training_schedules ON courses.id=training_schedules.course_id",
      (err, result) => {
        if (err) throw "fetching error";
        return res.json({ status: true, courseData: result });
      }
    );
  } catch (err) {
    res.json({ status: false, courseData: [] });
  }
};

const updateschedule = async (req, res) => {
  const { id } = req.params;
  try {
    const { course_id, starting_date, ending_date } = req.body;
    db.query(
      "UPDATE training_schedules SET course_id = ? ,starting_date = ? ,ending_date = ? ,updated_at =  ? WHERE id = ?",
      [
        Number(course_id),
        new Date(starting_date),
        new Date(ending_date),
        new Date(),
        id,
      ],
      (err, result) => {
        if (err) console.log(err);
        res.json({ status: true, message: "Updated Successfully" });
      }
    );
  } catch (err) {
    res.json({ status: false, message: "Updation Failed" });
  }
};

const deleteschedule = async (req, res) => {
  const { id } = req.params;
  try {
    db.query(
      "DELETE FROM training_schedules WHERE id = ?",
      [id],
      (err, result) => {
        if (err) throw "Deletion error";
        return res.json({ status: true });
      }
    );
  } catch (err) {
    res.json({ status: false });
  }
};

const availableCourse = async (req, res) => {
  try {
    db.query(
      "SELECT training_schedules.id,training_schedules.starting_date,training_schedules.ending_date,courses.name,courses.description from  courses INNER JOIN training_schedules ON courses.id=training_schedules.course_id",
      (err, result) => {
        if (err) throw "fetching error";
        const availableCourse = result.filter(
          (item) =>
            new Date(item.starting_date) >= new Date() ||
            new Date(item.ending_date) >= new Date()
        );
        return res.json({ status: true, courseData: availableCourse });
      }
    );
  } catch (err) {
    res.json({ status: false, courseData: [] });
  }
};
module.exports = {
  studentSignup,
  studentSignin,
  courseCreate,
  getAllcourse,
  updatecourse,
  deletecourse,
  createschedule,
  getAllschedule,
  updateschedule,
  deleteschedule,
  availableCourse,
  deleteStudent,
};
