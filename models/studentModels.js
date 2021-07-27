const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    required: [true, "please insert student name"],
  },
  subject: {
    type: Array,
    of: String,
    validate: {
      validator: (value) => value.length > 0,
      message: "There must be at least 1 subject!",
    },
  },
  passed: {
    type: Boolean,
    required: true,
  },
  entryDate: {
    type: Date,
    default: Date.now,
  },
  hobbies: [Number],
  parents: {
    father: String,
    mother: String,
  },
  subjects: [
    {
      name: { type: String, required: [true, "please insert subject name"] },
      marks: { type: Number, min: 5, max: 100 },
    },
  ],
});

module.exports.Student = model("student", studentSchema);