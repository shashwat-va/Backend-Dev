const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/students", studentController.createStudent);
router.get("/students", studentController.getAllStudents);
router.get("/students/email/:email", studentController.getStudentByEmail);
router.patch("/students/:id/gpa", studentController.updateStudentGPA);
router.delete("/students/:id", studentController.deleteStudent);
router.get("/students/gpa-range", studentController.getStudentsByGpaRange);
router.get("/students/more-than/:count/courses", studentController.getStudentsWithManyCourses);
router.get("/students/top", studentController.getTopStudentsByGpa);
router.get("/students/count-by-city", studentController.countStudentsByCity);

module.exports = router;
