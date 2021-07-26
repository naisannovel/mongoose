const router = require("express").Router();
const { students,newStudent,student,updateStudent,deleteStudent } = require('../controllers/studentController');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');

router.route("/students")
            .get(authorize,students)
            .post([authorize, admin],newStudent);

router.route("/students/:id")
            .get(authorize,student)
            .put([authorize, admin],updateStudent)
            .delete([authorize, admin],deleteStudent);

module.exports = router;