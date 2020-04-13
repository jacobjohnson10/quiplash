const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const AccessControl = require('accesscontrol');

const { Schema } = mongoose;

const logSchema = new Schema({
  creationDate: String,
  user: { // Only one person per user
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fullName: String,
  action: String, 
  category: String, // DEBUG, UPDATE, CREATE, COUNT
  sourceURL: String, 
  section: String, 
  details: {
    lastUpdate: String, // date
    count: Number,
    message: String,
    data: {}
  }
}, { collection: 'logs' });

// Add pagination to the model
logSchema.plugin(mongoosePaginate);

// Add realmAuthorization to the model
logSchema.plugin(realmAuthorization);

// Add statics
const resourceName = 'log';
logSchema.statics.resourceName = resourceName;

const grantsObject = {
  admin: {
    [resourceName]: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  user: {
    [resourceName]: {
      'read:own': ['*'],
    },
  },
};

logSchema.statics.ac = new AccessControl(grantsObject);
/**
 * Find or create an Log object.
 *
 * @param {Object} user
 *   User object that the function is being called on behalf of.
 *
 * @param {Object} query Object that contains the attributes used to query if the object already exists.
 *
 * @param {Object} person Object that contains the attributes used to create a new object if it doesn't already exist.
 */
logSchema.statics.findOrCreate = function findOrCreate(user, query, log) {
  const role = 'admin';
  const isOwner = true;
  return this.findOrCreateWithAuthorization(isOwner, role, query, log);
};

// Compile the model
module.exports = mongoose.model('Log', logSchema);
