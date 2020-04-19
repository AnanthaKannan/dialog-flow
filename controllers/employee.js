const { Employe } = require("../model/employ");

exports.isUserValid = async(req, res) => {
    const { empId } = req.body;
    const result = await Employe.find({empId});
    if(result.length > 0)
    return res.status(200).json({status:200, data:{status:true}})
    else
    return res.status(200).json({status:200, data:{status:false}})
}

exports.employeeByName = async(name) =>{
    // const name = "kannan"
    console.log('myname', name)
    const data = await Employe.find({ name: { $regex: new RegExp(name, 'i')  } });
    return data;
 }