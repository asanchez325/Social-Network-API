const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend
} = require('../../controllers/user-controllers');

// /api/user
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

router
.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(addFriend);

module.exports = router;