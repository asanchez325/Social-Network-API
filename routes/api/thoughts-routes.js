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
  .put(addReaction)
  .delete(removeThoughts);
// /api/comments/<UserId>/<thoughtsId>/<reactionId>
router
.route('/:pizzaId/:thoughtsId/:reactionId')
.delete(removeReaction);

module.exports = router;