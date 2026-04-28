const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  gpa: { type: Number, required: true, min: 0, max: 4.0 },
  city: { type: String, trim: true },
  courses: [{ type: String, trim: true }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
