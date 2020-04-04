const express = require("express");
const app = express();
const { dialog_flow } = require('./dialog_flow')
const port = 3000;
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post('/dialog_flow', async(req, res) => {
    const { text } = req.body;
    dialog_flow(text).then((result) =>{
        result.status = 200
        return res.status(200).json(result)
    })
    .catch((error) =>{
        return res.status(400).json({status:400, error:error})
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


    // "start": "GOOGLE_APPLICATION_CREDENTIALS=./bikeshopsample-ca7f0-fa609d83ca06.json node app.js",
