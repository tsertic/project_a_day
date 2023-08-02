const DATA = require("./../data/pokemons.json");
const pokemonModel = require("./../mongodb/models/pokemon.model");
exports.fillDBWithData = async () => {
  for (let pokemon of DATA) {
    console.log(pokemon);
    const res = await pokemonModel.create(pokemon);
    if (!res) {
      console.error("Something went wrong");
    }
  }
};
