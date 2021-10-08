const express = require("express");
const cors = require("cors")({ origin: true });
const router = express.Router();
// const upload = require("../helper/upload/multer");
const axios = require("axios");
const cheerio = require("cheerio");
const export_func = require("../helper/upload/upload_exports");
const ogs = require("open-graph-scraper");

const getMetaData = (html) => {
  const results = {};
  const $ = cheerio.load(html);
  // タイトル取得
  $("head title").each((i, el) => {
    const $el = $(el);
    const content = $el.text();
    if (content) {
      results["title"] = content;
    }
  });
  // メタ取得
  $("head meta").each((i, el) => {
    const $el = $(el);
    const propertyName = $el.attr("property") || $el.attr("name");
    const content = $el.attr("content");
    if (propertyName && content) {
      results[propertyName] = content;
    }
  });
  // favicon取得
  $("head link").each((i, el) => {
    const $el = $(el);
    const propertyName = $el.attr("rel");
    const content = $el.attr("href");
    if (propertyName && content) {
      if (
        propertyName === "icon" ||
        propertyName === "shortcut icon" ||
        propertyName === "icon shortcut"
      ) {
        results["icon"] = content;
      }
    }
  });
  return results;
};

router.post("/uploadfiles", async (req, res) => {
  console.log("99 5012**** 0000000000000001: ", req.body.url);
  cors(req, res, async () => {
    try {
      const options = {
        url: req.body.url,
      };

      console.log(
        "options.onlyGetOpenGraphInfo@@@@@@@@@@@@: ",
        options.onlyGetOpenGraphInfo
      );
      console.log("opttions@@@@@@@@@@@@: ", options);

      ogs(options, (error, results, response) => {
        console.log("error:", error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
        console.log("hostnameMetaTag:", results.hostnameMetaTag); // This contains all of the Open Graph results
        console.log("response:", typeof response); // This contains the HTML of page
        res.json(results);
      });
    } catch (err) {
      console.error("error01@@@@@@@@@@@@@@@@@@@@@@@@@@@ ", err.message);
    }
  });
});

module.exports = router;
