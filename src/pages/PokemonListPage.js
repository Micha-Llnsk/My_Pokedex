import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./PokemonListPage.css"

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(20);

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
        <li key={pokemon.name}>
          <Link className="listItem" to={`/pokemon/${id}`}>{pokemon.name}</Link>
        </li>
      );
      });
    }
    
    function loadMoreCharactersOnClick() {
      const urlPage = `https://pokeapi.co/api/v2/pokemon/?offset=${page}`;
      fetch(urlPage)
        .then((res) => res.json())
        .then((data) => {
          const morePokemons = [...pokemons, ...data.results];
          setPokemons(morePokemons);
      });
      return setPage(page + 20);
    }

return (
    <div className="listWrapper">
      <ul className="listContainer">{renderPokemons()}</ul>
        <button 
          className="loadButton"
          onClick={() => loadMoreCharactersOnClick()} 
        >Load More
        </button>
    </div>
  );
}
