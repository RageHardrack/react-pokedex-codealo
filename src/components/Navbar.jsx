import React, { useContext } from "react";
import FavoritesContext from "../context/favoritesContext";

const Navbar = () => {
  const { favoritePokemons } = useContext(FavoritesContext);
  let imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return (
    <nav>
      <div></div>

      <div>
        <img src={imgUrl} alt="Pokeapi-logo" className="navbar-image" />
      </div>

      <div>&#10084;&#65039; {favoritePokemons.length}</div>
    </nav>
  );
};

export default Navbar;
