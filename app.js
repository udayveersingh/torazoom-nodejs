const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { httpAuthenticateUser } = require("./src/controllers/users.controller");

const app = express();

app.use( cors({
    origin: 'http://localhost:8001'
}));

app.use( morgan("combined"));

app.use( express.json() );


const v1 = require("./src/routes/v1");
app.use("/api/v1", v1);

app.use("/api/authenticate", httpAuthenticateUser );

module.exports = app;