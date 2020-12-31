const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        defaults: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal) 
    }
},
{
    toJSON: {
        getters: true
    }
}
);


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
Array of nested documents created with the reactionSchema*/

reaction: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
);
/*Schema Settings
Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
*/

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;