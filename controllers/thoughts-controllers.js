const { Thoughts } = require('../models');

const thoughtsController = {
//GET all thoughts

getAllThoughts(req, res) {
    Thoughts.find({})
        .then(dbThoughtsData => this.res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            this.res.status(400).json(err);
        }); 
},

//GET single Thoughts by id

getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                this.res.status(404).json({ message: 'No Thoughts with this ID found!'});
                return;
            }
            this.res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            this.res.status(400).json(err);
        });
},

//POST new thought

createThoughts({ body}, res) {
    Thoughts.create(body)
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => res.status(400).json(err));
},

//PUT to update Thoughts by id

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
},

//DELETE to remove thoughts by id
deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({ message: 'No Thoughts with this id found!'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
}


};

module.exports = thoughtsController;