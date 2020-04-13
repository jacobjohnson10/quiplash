const mongoose = require('mongoose');
const { statusTypes } = require('../../lib/config');


const { Schema } = mongoose;

const userSchema = new Schema({
    roles: [String],
    status: String,
    personalData: {
        firstName: String,
        lastName: String,
        fullName: String,
        email: String,
        otherEmails: [{}],
        phone: String,
        otherPhones: [String],
        links: [{}],
    },
    authenticationData: {
        username: String,
        password: String,
        salt: String,
        token: String,
    },
    subscriptionData: {
        agreedTerms: String,      // null or date of agreement
        subScriptionStatus: String,
    },
    createDate: String,
    lastLogin: String,
}, { collection: 'users' });



// Compile the model
module.exports = mongoose.model('User', userSchema);
