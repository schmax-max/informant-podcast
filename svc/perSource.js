"use strict";
const axios = require("axios");
const convert = require("xml-js");
const Parser = require("rss-parser");
const parser = new Parser();

const { postData } = require("../config");
const { updateSource } = require("./updateSource");

async function perSource(source, trigger) {
  console.log(`starting perSource for ${source.name}`);
  // console.log({source})
  const { source_url } = source;
  const coreInfos = await getCoreInfos(source);

  const links = coreInfos.map((k) => k.content_url);
  console.log({ links });
  const scannerConfig = {
    target: `scanner`,
    data: { source_url, source_type: `podcast_${trigger}`, links, coreInfos },
  };
  postData(scannerConfig);
  return;
}

async function getCoreInfos({ source_url, name }) {
  try {
    const { items, title } = await parser.parseURL(source_url);
    // console.log({ title });

    const array = [items[0]];

    return array.reduce((arr, item) => {
      const coreInfo = getInfoPerPodcast(item);
      coreInfo.publisher = title;
      arr.push(coreInfo);
      return arr;
    }, []);
  } catch (e) {
    console.log({ e });
  }
}

function getInfoPerPodcast(item) {
  const coreInfo = {};

  coreInfo.title = item.title;
  coreInfo.content_url = item.enclosure.url;
  coreInfo.publication_date = item.isoDate;
  coreInfo.snippet = item.contentSnippet;
  coreInfo.image = item.itunes.image;
  coreInfo.content_minutes = getContentMinutes(item.itunes);
  coreInfo.content_type = "podcast";
  return coreInfo;
}

function getContentMinutes({ duration }) {
  let hours, minutes, seconds;
  if (duration.includes(":")) {
    const array = duration.split(":");
    seconds = array.slice(-1)[0];
    minutes = array.slice(-2, -1)[0];
    hours = array.slice(-3, -2)[0];
  } else {
    seconds = duration.slice(-2);
    minutes = duration.slice(-4, -2);
    hours = duration.slice(-6, -4);
  }
  let contentMinutes = parseInt(minutes);
  if (hours) {
    contentMinutes += parseInt(hours) * 60;
  }
  if (seconds && parseInt(seconds) > 29) {
    contentMinutes += 1;
  }

  return contentMinutes;
}

function parseInfo(htmlMarkup, pre, post) {
  let info = htmlMarkup;
  if (info) info = info.split(pre)[1];
  if (info) info = info.split(post)[0];
  return info;
}

module.exports = {
  perSource,
};
