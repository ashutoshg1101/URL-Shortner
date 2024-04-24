const express = require("express");
const URL = require("../models/url");
const {handleRedirection} = require("../controllers/url")
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
    name: req.user.name,
    urlExist: false,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/:id",handleRedirection)

module.exports = router;