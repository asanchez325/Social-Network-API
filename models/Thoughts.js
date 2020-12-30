const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema ({
/*thoughtText
String
Required
Must be between 1 and 280 characters*/
thoughtsText: {
    type: String,
    required: true,
},

/*createdAt
Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query*/
createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
},


/*username (The user that created this thought)
String
Required*/
writtenBy: {
    type: String,
    required: true,
},

/*reactions (These are like replies)
Array of nested documents created with the reactionSchema

Schema Settings
Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
*/
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
);


const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;