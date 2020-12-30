const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts
} = require('../../controllers/thoughts-controllers');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;