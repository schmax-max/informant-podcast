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
    channel_url: {
        type: "string"
    },
    created_at: {
        type: "date",
        format: "date-time"
    },
    boolean_settings: {
        type: "object"
    },
    process_flags: {
        type: "object"
    },
    curator_section_input: {
        type: "object"
    },
    curator_archive_input: {
        type: "object"
    }
})

schema.set('toJSON', { virtuals: true });

module.exports = {
    newsletters: mongoose.model(`source_newsletters`, schema),
    backups: mongoose.model(`source_backups`, schema),
};
