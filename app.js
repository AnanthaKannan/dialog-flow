const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors())

const { dialog_flow } = require('./dialog_flow')
const port = process.env.PORT || 4000;
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Sucessfully wroking..')
});

app.post('/dialog_flow', async(req, res) => {
    const { text } = req.body;
    dialog_flow(text).then((data) =>{
        return res.status(200).json({status:200, data:data})
    })
    .catch((error) =>{
        return res.status(400).json({status:400, error:error})
    })
})

app.post('/isUserValid', async(req, res) => {
    const { empId } = req.body;
    const empIds = [64, 65, 66, 67];
    const index = empIds.findIndex(id => id == empId);
    console.log('index', index);
    if(index >= 0 )
        return res.status(200).json({status:200, data:{status:true}})
    else
    return res.status(200).json({status:200, data:{status:false}})

})



app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


    // "start": "GOOGLE_APPLICATION_CREDENTIALS=./bikeshopsample-ca7f0-fa609d83ca06.json node app.js",
