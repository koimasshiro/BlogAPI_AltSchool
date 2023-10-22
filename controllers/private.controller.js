const { asyncHandler, ErrorResponse } = require('../utils');
const { calcRead } = require('../utils/core.utils');
const { ModelUser, ModelBlog } = require('../models');

/**
 * @description Getting All Blog Created By User
 * @route `/v1/blog/private/`
 * @access Private
 * @type GET
 */
exports.blogs = asyncHandler(async (req, res, next) => {
  const data = await ModelBlog.find({
    author: req.user._id
  });
  console.log(data);
  res.status(200).json({
    success: true,
    status: 'success',
    data
  });
});

/**
 * @description Getting All Blog Created By User
 * @route `/v1/blog/private/`
 * @access Private
 * @type GET
 */
exports.create = asyncHandler(async (req, res, next) => {
  const { title, body, image, description, tags } = req.body;
  if (!(title && body)) {
    return next(new ErrorResponse('title and body is required', 409));
  }
  const isExist = await ModelBlog.findOne({ title });
  if (isExist) {
    return next(new ErrorResponse('Blog Exist, Change title', 409));
  }

  const data = await ModelBlog.create({
    author: req.user._id,
    title,
    body,
    image,
    description,
    reading_time: calcRead(body.length),
    tags
  });
  res.status(200).json({
    success: true,
    status: 'success',
    data
  });
});

/**
 * @description Delete A Blog Created By User
 * @route `/v1/blog/private/:id`
 * @access Private
 * @type Delete
 */
exports.del = asyncHandler(async (req, res, next) => {
  await ModelBlog.deleteOne({
    author: req.user._id,
    _id: req.params.id
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: {}
  });
});

/**
 * @description Getting A Blog Created By User
 * @route `/v1/blog/private/:id`
 * @access Private
 * @type GET
 */
exports.blog = asyncHandler(async (req, res, next) => {
  const data = await ModelBlog.findOne({
    author: req.user._id,
    _id: req.params.id
  });
  res.status(200).json({
    success: true,
    status: 'success',
    data
  });
});

/**
 * @description Getting A Blog Created By User
 * @route `/v1/blog/private/:id/state`
 * @access Private
 * @type GET
 */
exports.state = asyncHandler(async (req, res, next) => {
  const data = await ModelBlog.findOne({
    author: req.user._id,
    _id: req.params.id
  });

  data.state = !data.state;
  await data.save();
  res.status(200).json({
    success: true,
    status: 'success',
    data
  });
});

/**
 * @description Delete A Blog Created By User
 * @route `/v1/blog/private/:id`
 * @access Private
 * @type Delete
 */
exports.del = asyncHandler(async (req, res, next) => {
  await ModelBlog.deleteOne({
    author: req.user._id,
    _id: req.params.id
  });

  res.status(200).json({
    success: true,
    status: 'success',
    data: {}
  });
});

/**
 * @description Edit A Blog Created By User
 * @route `/v1/blog/private/:id`
 * @access Private
 * @type PUT
 */
exports.updateBlog = asyncHandler(async (req, res, next) => {
  await ModelBlog.updateOne(
    {
      author: req.user._id,
      _id: req.params.id
    },
    req.body
  );
  res.status(200).json({
    success: true,
    status: 'success',
    data: req.body
  });
});
