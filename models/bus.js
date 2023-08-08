const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStop' }],
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
