const express = require("express");
const connectToMonogoDB = require("./connection");
const urlRoute = require("./routes/urlRoutes");
const URL = require("./models/url");
const cors = require('cors')

const app = express();
const port = 8000;

connectToMonogoDB();

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use("/",urlRoute);

app.listen(port,() => console.log(`server started on port = ${port}`))