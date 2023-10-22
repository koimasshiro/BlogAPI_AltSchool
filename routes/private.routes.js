const express = require('express');
const router = express.Router();

const {
  blogs,
  create,
  del,
  blog,
  state,
  updateBlog
} = require('../controllers/private.controller');
const { protect } = require('../middleware');

router.use(protect);

router.get('/', blogs);
router.post('/', create);
router.delete('/:id', del);
router.get('/:id', blog);
router.put('/:id', updateBlog);
router.put('/:id/state', state);

module.exports = router;
