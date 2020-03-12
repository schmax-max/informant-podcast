"use strict";
const axios = require("axios");
const { postData } = require("../config");
const { updateSource } = require("./updateSource");

async function perSource(source, trigger) {
  console.log(`starting perSource for ${source.name}`);
  // console.log({source})
  const { source_url } = source;
  const coreInfos = await getCoreInfos(source);
  const links = coreInfos.map(k => k.content_url);
  const scannerConfig = {
    target: `scanner`,
    data: { source_url, source_type: `youtube_${trigger}`, links, coreInfos }
  };
  postData(scannerConfig);
  return;
}

async function getCoreInfos({ source_url, name }) {
  try {
    const { data } = await axios.get(source_url);
    const array = data.split(`class="yt-lockup-title ">`);
    array.shift();
    // array = [array[0]];
    let iterations = array.length;
    return array.reduce((arr, item) => {
      const coreInfo = getInfoPerVideo(item);
      coreInfo.publisher = name;
      arr.push(coreInfo);
      return arr;
    }, []);

    // return coreInfos;
  } catch (e) {
    console.log({ e });
  }
}

function getInfoPerVideo(htmlMarkup) {
  const coreInfo = {};

  const slug = parseInfo(htmlMarkup, `href="`, '"');
  coreInfo.content_url = `https://www.youtube.com${slug}`;
  coreInfo.views = parseInt(
    parseInfo(htmlMarkup, `info"><li>`, " views").replace(",", "")
  );
  coreInfo.title = parseInfo(htmlMarkup, `"nofollow">`, "</a>");
  const minutes = parseInt(parseInfo(htmlMarkup, `Duration: `, " minutes, "));
  const seconds = parseInt(parseInfo(htmlMarkup, ` minutes, `, " seconds."));
  let content_minutes = minutes;
  if (seconds > 29) {
    content_minutes += 1;
  }

  coreInfo.content_minutes = content_minutes;
  coreInfo.content_type = "video";
  return coreInfo;
}

function parseInfo(htmlMarkup, pre, post) {
  let info = htmlMarkup;
  if (info) info = info.split(pre)[1];
  if (info) info = info.split(post)[0];
  return info;
}

module.exports = {
  perSource
};
