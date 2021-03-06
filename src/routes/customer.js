'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.get('/', controller.get);
router.post('/', controller.post);
router.delete('/', controller.delete);
router.post('/authenticate', controller.authenticate);

module.exports = router;