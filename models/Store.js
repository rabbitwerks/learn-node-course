const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

storeSchema.pre('save', function(next){
  if(!this.isModified('name')){
    next(); // skip it
    return  // stop it
  }
  this.slug = slug(this.name);  // set it
  next();                       // send it
})

module.exports = mongoose.model('Store', storeSchema)