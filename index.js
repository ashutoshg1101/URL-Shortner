const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const connectToMonogoDB = require("./connection");
const urlRoute = require("./routes/urlRoutes");
const userRoute = require("./routes/uesrRoutes")
const staticRouter = require("./routes/staticRouter");
const path = require("path");
const URL = require("./models/url");
const cors = require('cors')
const cookieParser = require("cookie-parser")
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");


const app = express();
const PORT = process.env.PORT || 8000;


connectToMonogoDB();


app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
})
app.use(express.json());
app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth,staticRouter);



app.listen(PORT,() => console.log(`server started on port = ${PORT}`))