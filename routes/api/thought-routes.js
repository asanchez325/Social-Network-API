const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controllers');

// /api/thought
router
  .route('/')
  .get(getAllThought)

// /api/thought
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

// /api/thought/<userId>
router
  .route('/:userId/')
  .post(addThought);

// /api/thought/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .post(addReaction)
  .delete(removeThought);
// /api/thought/<UserId>/<thoughtId>/<reactionId>
router
.route('/:userId/:thoughtId/:reactionId')
.delete(removeReaction);

module.exports = router;