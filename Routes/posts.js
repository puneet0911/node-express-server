var express = require('express');
var router = express.Router();
const postController = require('../controllers/post.controller');

/* GET all posts. */
router.get('/all', postController.getAllPosts);

/* POST post. */
router.post('/add', postController.createPost);

/* Get post. */
router.get('/get/:postId', postController.getPostDetails);

/* Update post. */
router.put('/update/:postId', postController.updatePost);

module.exports = router;
