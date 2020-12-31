const { Thoughts, User } = require('../models');

const thoughtsController = {
//GET all thoughts

getAllThoughts(req, res) {
    Thoughts.find({})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400);
        }); 
},

//GET single Thoughts by id

getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts with this ID found!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},

//POST new thought
 addThoughts ({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
        .then(({_id}) => {
        return User.findOneAndUpdate(
            {_id: params.userId},
            {$push: { thoughts: _id}},
            {new: true}
        );
        })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

addReaction({ params, body}, res) {
    Thoughts.findOneAndUpdate(
        {_id: params.thoughtsId},
        { $push: { reaction: body}},
        { new: true}
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Ni user found with this ID!' });
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.json(err));
},

/*PUT to update Thoughts by id
NEED TO FIGURE OUT HOW TO UPDATE USER
updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id}, body, { new: true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id!'});
                return;
            }
            res.json(dbThoughtsData);
            })
        .catch(err => res.status(400).json(err));
}, */

//DELETE to remove thoughts by id
removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsid})
    .then(deletedThoughts => {
        if (!deletedThoughts) {
           return res.status(404).json({ message: 'No Thoughts with this id found!'});
        }
    return User.findOneAndUpdate(
        {_id: params.userId },
        { $pull: { thoughts: params.thoughtsId }},
        { new: true }
    );
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

removeReaction({ params}, res) {
    Thoughts.findOneAndUpdate(
        { _id: params.reactionId},
        { $pull: {reactions: { reactionId: params.reactionId}}},
        { new: true }
    )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
}
};

module.exports = thoughtsController;