const { asyncHandler, ErrorResponse } = require('../utils');
const { calcRead } = require('../utils/core.utils');
const { ModelUser, ModelBlog } = require('../models');

/**
 * @description Getting All Blog Created By User
 * @route `/v1/blog/`
 * @access Private
 * @type GET
 */
exports.blogs = asyncHandler(async (req, res, next) => {
  const data = await ModelBlog.find({
    state: true
  }).populate('author', {
    firstname: 1,
    lastname: 1,
    image: 1
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data
  });
});

/**
 * @description Getting A Blog
 * @route `/v1/blog/private/:id`
 * @access Public
 * @type GET
 */
exports.blog = asyncHandler(async (req, res, next) => {
  const data = await ModelBlog.findOne({
    state: true,
    _id: req.params.id
  }).populate('author', {
    firstname: 1,
    lastname: 1,
    image: 1
  });

  if (!data) {
    return res.status(404).json({
      success: false,
      status: 'Resource Not Found',
      error: '404 Content Do Not Exist Or Has Been Deleted'
    });
  }
  data.read_count = data.read_count + 1;
  await data.save();
  res.status(200).json({
    success: true,
    status: 'success',
    data
  });
});
