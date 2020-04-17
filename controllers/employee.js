const { Employe } = require("../model/employ");

exports.isUserValid = async(req, res) => {
    const { empId } = req.body;
    const result = await Employe.find({empId});
    if(result.length > 0)
    return res.status(200).json({status:200, data:{status:true}})
    else
    return res.status(200).json({status:200, data:{status:false}})
}