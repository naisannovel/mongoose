const { Student } = require('../models/studentModels');

module.exports.students = async (req,res)=>{
    const result = await Student.find({}).sort({name:1});   // .select({name:1,age:0}).limit(5)
    res.send(result);
}

module.exports.newStudent = async (req,res)=>{
    const student = new Student(req.body);
    try{
        const result = await student.save()
        res.send(result);
    }catch(err){
        const error = [];
        for(field in err.errors){
            error.push(err.errors[field].message);
        }
        res.send(error)
    }
}

module.exports.student = async (req,res)=>{
    const id = req.params.id;
    const result = await Student.findById(id);
    if(!result) return res.status(404).send('not found');
    res.send(result)
}

module.exports.updateStudent = async (req,res)=>{
    const id = req.params.id;
    const newData = req.body;
    const result = await Student.findByIdAndUpdate(id,newData,{new:true});
    if(!result) return res.status(404).send('not found');
    res.send(result);
}

module.exports.deleteStudent = async (req,res)=>{
    const id = req.params.id;
    const result = await Student.findByIdAndDelete(id);
    if(!result) return res.status(404).send('not found');
    res.send(`successfully deleted ${result.name}'s history`);
}