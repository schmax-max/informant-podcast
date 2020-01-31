const express = require('express');
const router = express.Router();
const {master} = require('../../svc');
const service = require('../service');

router.post(`/${service}/:type`, trigger);

async function trigger (req, res, next) {
  const response = await master(req.params)
  res.send(response)
}

module.exports = router