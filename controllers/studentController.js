const Student = require("../models/Student");

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json(student);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().lean();
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudentByEmail = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email.toLowerCase() }).lean();
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStudentGPA = async (req, res) => {
  try {
    const { gpa } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { gpa },
      { new: true, runValidators: true }
    ).lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json(student);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id).lean();
    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudentsByGpaRange = async (req, res) => {
  try {
    const students = await Student.find({ gpa: { $gte: 3.0, $lte: 3.5 } }).lean();
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStudentsWithManyCourses = async (req, res) => {
  try {
    const minCourses = parseInt(req.params.count, 10) || 5;
    const students = await Student.find({ $expr: { $gt: [{ $size: "$courses" }, minCourses] } }).lean();
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTopStudentsByGpa = async (req, res) => {
  try {
    const students = await Student.find().sort({ gpa: -1 }).limit(10).lean();
    return res.json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const countStudentsByCity = async (req, res) => {
  try {
    const counts = await Student.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $project: { _id: 0, city: "$_id", count: 1 } }
    ]);
    return res.json(counts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentByEmail,
  updateStudentGPA,
  deleteStudent,
  getStudentsByGpaRange,
  getStudentsWithManyCourses,
  getTopStudentsByGpa,
  countStudentsByCity
};
