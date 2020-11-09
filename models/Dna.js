const { Schema, model } = require('mongoose');

const DnaSchema = new Schema({
  dna: {
    type: [String],
    required: true,
  },
  mutations: {
    type: [String],
  },
});

module.exports = model('Dna', DnaSchema);
