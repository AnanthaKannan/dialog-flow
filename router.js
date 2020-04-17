const express = require("express");
const router = express.Router();
const { dialog_flow } = require('./controllers/dialog_flow');
const fn = require('./controllers/fn');
const employee = require('./controllers/employee');

router.get('/', fn.chk);

router.post('/isUserValid', employee.isUserValid);

router.post('/dialog_flow', async(req, res) => {
    const { text } = req.body;
    dialog_flow(text).then((data) =>{
        return res.status(200).json({status:200, data:data})
    })
    .catch((error) =>{
        return res.status(400).json({status:400, error:error})
    })
});
module.exports = router;