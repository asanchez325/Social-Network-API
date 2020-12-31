const { User } = require('../models');

const userController = {
//GET all users

getAllUser(req, res) {
    User.find({})
        .populate([
            {path: 'thoughts', select: '-__v'},
            {path: 'friends', select: '-__v'},
        ])
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }); 
},

//GET single user by id

getUserById({ params }, res) {
    User.findOne({ _id: params.id })
        .populate([
            {path: 'thoughts', select: '-__v'},
            {path: 'friends', select: '-__v'},
        ])
        .select('-__v')    
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
      

//POST new user

createUser({ body}, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
},

//PUT to update user by id

updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id}, body, { new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
            })
        .catch(err => res.status(400).json(err));
},

//DELETE to remove user by id
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

//ADD Friend
addFriend ({ params }, res) {
    User.findOneAndUpdate(
        {_id: params.userId},
        { $adToSet: { friends: params.friendId}},
        { new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Ni user found with this ID!' });
            return;
        }
      User.findOneAndUpdate(
          { _id: params.friendId},
          { $addToSet: { friends: params.userId}},
          { new: true}
      )
      .then(dbUserData2 => {
        if(!dbUserData2) {
            res.status(404).json({ message: 'No user found with this friendId' })
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
})
.catch(err => res.json(err));
}, 
//DELETE Friend
deleteFriend ({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId},
        { $pull: { friends: params.friendId}},
        { new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
           res.status(404).json({ message: 'No user found with this ID!' });
            return; 
        }
    User.findOneAndUpdate(
        { _id: params.friendId },
        { $pull: { friends: params.userId }},
        { new: true }
            )
    .then(dbUserData2 => {
        if (!dbUserData2) {
            res.status(404).json({ message: 'No user found with this ID!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
        })
    .catch(err => res.json(err));
},
}
module.exports = userController;
