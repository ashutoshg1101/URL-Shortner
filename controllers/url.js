var { nanoid } = require('nanoid');
const URL = require("../models/url");

async function handleCreateShortID(req, res) {
  const {url} = req.body;
  const {customURL} = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  var nanoID = nanoid(10);
  if(customURL != "" && customURL != undefined && customURL != null)
  {
    let checkCustomUrl = await URL.findOne({shortID : customURL});
    console.log(checkCustomUrl);
    if(checkCustomUrl == null || checkCustomUrl == undefined)
    {
      nanoID = customURL;
    }
    else
    {
      console.log("hello");
      const allurls = await URL.find({ createdBy: req.user._id });
      return res.render("home", {
        urls: allurls,
        name: req.user.name,
        urlExist: true
      });
      console.log("hello2");
      // return res.redirect("/");
    }
  }
  console.log("hello3");
  await URL.create({
    shortID: nanoID,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.redirect("/");
}

async function handleRedirection(req,res){
  const shortID = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.json({ error: " wrong short id" });
  }
  return res.redirect(entry.redirectURL);
}

async function handleGetvisitLog(req,res){
  const shortID = req.params.id;
  const entry = await URL.findOne({shortID});
  if(!entry){return res.json({ error: " wrong short id" });}
  return res.json({
    totalClick: entry.visitHistory.length,
    log: entry.visitHistory
  })
}

async function handleDeleteURL(req,res){
  let shortID = req.body.shortID;
  await URL.deleteOne({shortID});
  res.redirect("/");
}

module.exports = {
    handleCreateShortID,
    handleRedirection,
    handleGetvisitLog,
    handleDeleteURL
}