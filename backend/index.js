const express = require("express");
const connectToMonogoDB = require("./connection");
const urlRoute = require("./routes/urlRoutes");
const URL = require("./models/url");
const cors = require('cors')

const app = express();
const port = 8000;

connectToMonogoDB();

app.use(cors({
    origin: ["https://short-url-lt4w.onrender.com","http://localhost:3000"],
    optionsSuccessStatus: 200 // For legacy browser support
    }));
app.use(express.json());
app.use("/",urlRoute);

app.listen(port,() => console.log(`server started on port = ${port}`))