const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', mealsCtrl.index);
router.get('/new', ensureLoggedIn, mealsCtrl.new)

module.exports = router;