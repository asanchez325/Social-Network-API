  
const { Schema, model, } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema ({
//username
userName: {
    type: String,
    required: true, 
    unique: true, 
},

//email

userEmail: {
    type: String,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address'],
    unique: true,
},

//thought
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

//friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;