const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');
const ensureLoggedIn = require('../config/ensureLoggedIn');



router.get('/', mealsCtrl.index);
router.get('/new', ensureLoggedIn, mealsCtrl.new)
router.post('/', ensureLoggedIn, mealsCtrl.create);
router.get('/:id', mealsCtrl.show);
router.delete('/:id', mealsCtrl.delete)

module.exports = router;