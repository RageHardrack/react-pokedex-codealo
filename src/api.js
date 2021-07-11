export const searchPokemon = async (pokemon) => {
  try {
    let url = "https://pokeapi.co/api/v2/pokemon";

    const response = await fetch(`${url}/${pokemon}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPokemons = async (limit = 10, offset = 0) => {
  try {
    let url = "https://pokeapi.co/api/v2/pokemon";

    const response = await fetch(`${url}?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPokemonData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
