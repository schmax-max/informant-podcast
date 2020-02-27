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
  source_domain: {
    type: "string"
  },
  created_at: {
    type: "date",
    format: "date-time"
  },
  boolean: {
    type: "object"
  },
  previous_pull: {
    type: "object"
  },
  filtering: {
    type: "object"
  },
  archive: {
    type: "object"
  }
});

schema.set("toJSON", { virtuals: true });

module.exports = createModels();

function createModels() {
  const collections = ["curators", "publishers", "slugs", "photos"];
  const models = {};
  collections.forEach(collection => {
    models[collection] = mongoose.model(
      `snapshot_${collection}`,
      schema,
      `snapshot_${collection}`
    );
  });
  return models;
}
