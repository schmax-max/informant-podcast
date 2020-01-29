'use strict'
const mongoose = require('mongoose');

const schema = new mongoose.Schema( {
    _type: {
        type: "string"
    },
    _id: {
        type: "ObjectId"
    },
    created_at: {
        type: "date",
        format: "date-time"
    },
    name: {
        type: "string"
    },
    url: {
        type: "string"
    },
    host: {
        type: "string"
    },
    mbfc: {
        type: "object"
    }
})

schema.set('toJSON', { virtuals: true });

module.exports = {
    newsletters: mongoose.model(`source_newsletters`, schema),
};
