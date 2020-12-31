  
const { Schema, model, } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema ({
/*username
String
Unique
Required
Trimmed*/

userName: {
    type: String,
    required: true, 
    unique: true, 
},

/*email
String
Required
Unique
Must match a valid email address (look into Mongoose's matching validation)*/

userEmail: {
    type: String,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address'],
    unique: true,
},

/*thought
Array of _id values referencing the Thought model*/
thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }

],
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
);

/*friends
Array of _id values referencing the User model (self-reference)
Schema Settings
Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
*/
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;