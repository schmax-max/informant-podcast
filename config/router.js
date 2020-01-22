const express = require('express');
const router = express.Router();
const {links} = require('./svc');

router.post('/links', trigger);

async function trigger (req, res, next) {
  const {sourceUrl} = req.body
  const response = await links(sourceUrl)
  res.send(response)
}

module.exports = {router}