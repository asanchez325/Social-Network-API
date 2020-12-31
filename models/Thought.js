const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal) 
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);


const ThoughtSchema = new Schema ({
/*thoughtText
String
Required
Must be between 1 and 280 characters*/
thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
},
/*username (The user that created this thought)
String
Required*/
writtenBy: {
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

/*reaction (These are like reactions)
Array of nested documents created with the reactionSchema*/

reaction: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);
/*Schema Settings
Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
*/

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;