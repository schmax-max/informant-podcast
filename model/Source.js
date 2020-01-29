'use strict'
const mongoose = require('mongoose');

const schema = new mongoose.Schema( {
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
    process_flags: {
        type: "object"
    },
    filtering: {
        type: "object"
    },
    archive: {
        type: "object"
    }
})

schema.set('toJSON', { virtuals: true });

module.exports = {
    newsletters: mongoose.model(`source_newsletters`, schema),
    curators: mongoose.model(`source_curators`, schema),
    publishers: mongoose.model(`source_publishers`, schema),
    slugs: mongoose.model(`source_slugs`, schema),
    photos: mongoose.model(`source_photos`, schema),
};
