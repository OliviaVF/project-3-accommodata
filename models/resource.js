const mongoose = require('mongoose');
const geocoder = require('node-geocoder')({ provider: 'google' });

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  website: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

resourceSchema.pre('save', function getLocation(next) {
  if(!this.isModified('address')) return next();
  geocoder.geocode(this.address, ( err, data ) => {
    if(err) return next(err);

    this.location = {
      lat: data[0].latitude,
      lng: data[0].longitude
    };

    next();
  });
});

module.exports = mongoose.model('Resource', resourceSchema);
