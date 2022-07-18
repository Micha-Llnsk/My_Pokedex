import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./PokemonListPage.css"

export default function PokemonListPage() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data) => {
      return Promise.all(
        data.results.map((url) => {
          return fetch(`${url.url}`)
          .then((res) => res.json());
        })
      )
      .then((data) => {
        setPokemons(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }, []);

  function renderPokemons() {
    if (isLoading || pokemons === null) {
      return "Loading...";
    }

    return pokemons.map((pokemon, index) => {
      return (
        <li key={pokemon.name}>
          <Link className="listItem" to={`/pokemon/${pokemon.id}`}>
            <img className="pokeListArt" src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={`${pokemon.name}`} />
            </Link>
        </li>
      );
      });
    }

    function loadMoreCharacters() {
      fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}`)
        .then((res) => res.json())
        .then((data) => {
          return Promise.all(
            data.results.map((url) => {
              return fetch(`${url.url}`)
              .then((res) => res.json());
            })
          )})      
          .then((data) => {
            const morePokemons = [...pokemons, ...data];
            setPokemons(morePokemons);
        })
        return setPage(page + 20);
    };

return (
    <div className="listWrapper">
      <ul className="listContainer">{renderPokemons()}</ul>
        <button 
          className="loadButton"
          onClick={loadMoreCharacters} 
        >Load More
        </button>
    </div>
  );
}
