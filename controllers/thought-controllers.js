const bodyParser = require('body-parser');
const { Thought, User } = require('../models');

const thoughtController = {
//GET all thought
getAllThought(req, res) {
    Thought.find({})
        .populate({ 
            path: 'reaction', 
            select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }); 
},

//GET single Thought by id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
        .populate({ path: 'reaction', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts with this ID found!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},

//POST new thought
 addThought ({ params, body }, res) {
    console.log(body);
    Thought.create(body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id}},
            { new: true }
        );
        })
    .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reaction: body}},
        { new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.json(err));
},

//PUT to update Thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id}, body, 
        { new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbUserData);
            })
        .catch(err => res.status(400).json(err));
}, 

//DELETE to remove thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id}, body, 
        { new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbUserData);
            })
        .catch(err => res.status(400).json(err));
}, 

//DELETE to remove user by id
removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  
// remove reaction

removeReaction({ params, body}, res) {
 
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reaction: body}},
        { new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.json(err));
},

};

module.exports = thoughtController;