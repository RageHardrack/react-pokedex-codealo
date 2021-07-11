import React, { useState, useEffect } from "react";
import { getPokemonData, getPokemons } from "./api";
import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import SearchBar from "./components/SearchBar";
import { FavoriteProvider } from "./context/favoritesContext";

const localStorageKey = "favorite_pokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);

      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
    } catch (error) {
      console.error(error);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    console.log("Obteniendo pokemones favoritos");
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    console.log("Obteniendo todos los pokemones");
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  return (
    <FavoriteProvider
      value={{ favoritePokemons: favorites, updateFavoritePokemons }}
    >
      <div>
        <Navbar />
        <div className="App">
          <SearchBar />
          <Pokedex
            loading={loading}
            page={page}
            setPage={setPage}
            pokemons={pokemons}
            total={total}
          />
        </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
