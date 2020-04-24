const { Employe } = require("../model/employ");

exports.isUserValid = async(req, res) => {
    const { empId } = req.body;
    const result = await Employe.find({empId: Number(empId)});
    if(result.length > 0)
    return res.status(200).json({status:200, data:{status:true}})
    else
    return res.status(200).json({status:200, data:{status:false}})
}

exports.employeeByName = async(name) =>{
    console.log('myname', name)
    const name_replace = name.replace(/ /g, " ");
    const data = await Employe.find({ name: { $regex: new RegExp(name_replace, 'i')  } });
    return data;
 }

 exports.employeeByDesignation = async(designation) =>{
    console.log('designation', designation)
    const data = await Employe.find({ position: { $regex: new RegExp(designation, 'i')  } });
    return data;
 }