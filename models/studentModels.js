const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    subject:{
        type: Array,
        of: String,
        validate:{
            validator: value => value.length > 0,
            message: "There must be at least 1 subject!"
        }
    },
    passed:{
        type: Boolean,
        required: true
    }
})

module.exports.Student = model('student',studentSchema);