const express = require("express");
const cors = require('cors')
const router = require('./router')
const app = express();
app.use(cors())

app.use(express.json());
app.use(router);
require("./db")();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


    // "start": "GOOGLE_APPLICATION_CREDENTIALS=./bikeshopsample-ca7f0-fa609d83ca06.json node app.js",
