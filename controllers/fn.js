
const { dialog_flow } = require('./dialog_flow');

exports.chk = async(req, res) =>{
    console.log('api called');
    res.send('Sucessfully wroking..')
}

exports.dialogFlow = async(req, res) => {
    const { text } = req.body;
    dialog_flow(text).then((data) =>{
        return res.status(200).json({status:200, data:data})
    })
    .catch((error) =>{
        return res.status(400).json({status:400, error:error})
    })
}