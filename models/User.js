const { Schema, model } = require('mongoose');
const UserSchema = new Schema ({
/*username
String
Unique
Required
Trimmed*/

userName: {
    type: String,
    unique: true,
    required: true,  
    trim: true
},

/*email
String
Required
Unique
Must match a valid email address (look into Mongoose's matching validation)*/

userEmail: {
    type: String,
    unique: true,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
}

/*thoughts
Array of _id values referencing the Thought model

friends
Array of _id values referencing the User model (self-reference)
Schema Settings

Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
*/

});

const User = model('User', UserSchema);

module.exports = User;