"use strict";
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _type: {
    type: "string"
  },
  _id: {
    type: "ObjectId"
  },
  name: {
    type: "string"
  },
  source_url: {
    type: "string"
  },
  previous_pull: {
    type: "object"
  }
});

schema.set("toJSON", { virtuals: true });

module.exports = createModels();

function createModels() {
  const collections = ["sports"];
  const models = {};
  collections.forEach(collection => {
    models[collection] = mongoose.model(
      `youtube_${collection}`,
      schema,
      `youtube_${collection}`
    );
  });
  return models;
}
