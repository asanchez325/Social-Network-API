const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  removeThoughts,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controllers');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)

// /api/thoughts
router
    .route('/:id')
    .get(getThoughtsById);

// /api/thoughts/<userId>
router
  .route('/:userId/')
  .post(addThoughts);

// /api/thoughts/<userId>/<thoughtsId>
router
  .route('/:userId/:thoughtsId')
  .post(addReaction)
  .delete(removeThoughts);
// /api/thoughts/<UserId>/<thoughtsId>/<reactionId>
router
.route('/:userId/:thoughtsId/:reactionId')
.delete(removeReaction);

module.exports = router;