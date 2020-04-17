const express = require("express");
const router = express.Router();
const fn = require('./controllers/fn');
const employee = require('./controllers/employee');

router.get('/', fn.chk);

router.post('/isUserValid', employee.isUserValid);

router.post('/dialog_flow', fn.dialogFlow);

module.exports = router;