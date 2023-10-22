const express = require('express');
const router = express.Router();

const { blogs, blog } = require('../controllers/public.controller');

router.get('/', blogs);
router.get('/:id', blog);

module.exports = router;
