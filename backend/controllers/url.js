var { nanoid } = require('nanoid');
const URL = require("../models/url");

async function handleCreateShortID(req, res) {
  const {url} = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const nanoID = nanoid(10);
  console.log(typeof nanoID);
  console.log(url);

  await URL.create({
    shortID: nanoID,
    redirectURL: url,
    visitHistory: [],
  });

  // await newURL.save;
  const shortURL = "http://localhost:8000/"+nanoID;
  return res.json({ id: nanoID , shortURL: shortURL });
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

module.exports = {
    handleCreateShortID,
    handleRedirection,
    handleGetvisitLog
}