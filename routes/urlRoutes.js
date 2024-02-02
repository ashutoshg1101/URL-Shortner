const express = require("express");
const {handleCreateShortID ,handleGetvisitLog , handleDeleteURL} = require("../controllers/url.js")
const router = express.Router();

router
    .post("/",handleCreateShortID)
    .get("/log/:id",handleGetvisitLog)
    .post("/delete",handleDeleteURL);

module.exports = router;