const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./module/route')(app);

app.listen(3000,() => {
    console.log("Server is running...")
});