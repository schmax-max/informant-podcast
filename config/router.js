const express = require('express');
const router = express.Router();
const {sherpa} = require('./svc');

router.post('/sherpa', trigger);

async function trigger (req, res, next) {
  const {links} = req.body
  const response = await sherpa(links)
  res.send(response)
}

module.exports = {router}