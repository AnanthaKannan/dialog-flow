const express = require("express");
const router = express.Router();
const fn = require('./controllers/fn');
const employee = require('./controllers/employee');
const webhook = require('./controllers/webhook')

router.get('/', fn.chk);

router.post('/isUserValid', employee.isUserValid);

router.post('/dialog_flow', fn.dialogFlow);

router.post('/webhook', webhook.webhook)

module.exports = router;