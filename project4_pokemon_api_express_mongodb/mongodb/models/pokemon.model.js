const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  pokedexNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  abilities: {
    type: [String],
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  nextEvolution: {
    type: Number,
    default: null,
  },
  previousEvolution: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("pokemonModel", pokemonSchema);
