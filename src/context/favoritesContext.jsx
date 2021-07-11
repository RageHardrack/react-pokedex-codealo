import React from "react";

const FavoritesContext = React.createContext({
  favoritePokemons: [],
  updateFavoritePokemons: (id) => null,
});

export const FavoriteProvider = FavoritesContext.Provider;

export default FavoritesContext;
