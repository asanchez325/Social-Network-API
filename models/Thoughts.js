const { Schema, model } = require('mongoose');
const ThoughtSchema = new Schema ({
/*thoughtText
String
Required
Must be between 1 and 280 characters*/
thoughtText: {
    type: String,
    required: true,
},

/*createdAt
Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query*/
createdAt: {
    type: Date,
    default: Date.now
},


/*username (The user that created this thought)
String
Required

//reactions (These are like replies)
Array of nested documents created with the reactionSchema

Schema Settings
Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
*/

});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;