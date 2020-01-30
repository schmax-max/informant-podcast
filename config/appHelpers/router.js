const express = require('express');
const router = express.Router();
const {master} = require('../../svc');
const service = require('../service');

router.post(`/${service}`, trigger);

async function trigger (req, res, next) {
  const response = await master(req.body)
  res.send(response)
}

module.exports = router