const express = require("express");
const {handleCreateShortID , handleRedirection ,handleGetvisitLog} = require("../controllers/url.js")
const router = express.Router();

router
    .post("/url",handleCreateShortID)
    .get("/:id",handleRedirection)
    .get("/url/log/:id",handleGetvisitLog);

module.exports = router;