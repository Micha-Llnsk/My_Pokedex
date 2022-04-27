import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setPokemons(data.results);
    });
  }, []);

  function renderPokemons() {
    return pokemons.map((pokemon, index) => {
    const id = index + 1;
      return (
        <li key={id}>
          <Link to={`/pokemon/${id}`}>{pokemon.name}</Link>
        </li>
      );
      });
    }
return <ul>{renderPokemons()}</ul>;

}
