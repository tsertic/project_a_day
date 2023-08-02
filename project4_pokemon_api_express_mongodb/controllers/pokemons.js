const pokemonModel = require("./../mongodb/models/pokemon.model");

//GET
// v1/pokemons
// Public
// Get All pokemons
// Queries: "type" , "sort=desc" for desc sort by pokedexNumber

exports.getPokemons = async (req, res) => {
  let sortOrder = "asc";
  if (req.query.sort === "desc") {
    sortOrder = "desc";
  }
  if (req.query.type) {
    const pokemonType = req.query.type;
    const pokemons = await pokemonModel
      .find({ type: pokemonType })
      .collation({ locale: "en", strength: 2 })
      .sort({ pokedexNumber: sortOrder });
    if (!pokemons) {
      return res.status(404).json({
        success: false,
        count: 0,
        data: [],
        message: "something gone wrong",
      });
    }
    return res.json({
      success: true,
      count: pokemons.length,
      data: pokemons,
      message: "",
    });
  }

  //if not type queries return all pokemons

  const pokemons = await pokemonModel.find().sort({ pokedexNumber: sortOrder });
  if (!pokemons) {
    return res.status(404).json({
      success: false,
      count: 0,
      data: [],
      message: "something gone wrong",
    });
  }
  res.json({
    success: true,
    count: pokemons.length,
    data: pokemons,
    message: "Success",
  });
};
