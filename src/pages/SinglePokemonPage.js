import { useParams, useHistory } from "react-router-dom";
import {useEffect, useState} from "react";
import "./SinglePokemonPage.css"

export default function SinglePokemonPage() {
  const history = useHistory();
  const {pokeId} = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    setIsloading(true);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setPokemon(data);
      setIsloading(false);
    });
  }, [pokeId]);
  
  function renderPokemon() {
    if (isLoading || pokemon === null) {
      return "Loading...";
    }
    
    const { name, sprites, types, abilities, id, stats } = pokemon;
    
    function renderType() {
      let typ;
      if (types.length > 1) {
        typ = `${types[0].type.name} / ${types[1].type.name}`
      } else {
        typ = types[0].type.name
      }
      return typ;
    }

    function renderAbility() {
      let abili;
      if (abilities.length > 1) {
        abili = `${abilities[0].ability.name} / ${abilities[1].ability.name}`
      } else {
        abili = abilities[0].ability.name
      }
      return abili;
    }

    function handleGoPrev() {
      history.push(`/pokemon/${id - 1}`);
    }

    function handleGoNext() {
      history.push(`/pokemon/${id + 1}`);
    }
    
  return (
    <div className="pokeWrapper">
      <div className="char__card">
        <h2 className="pokeName">{name}</h2>

        <div className="pokeImg">
          <img className="pokeArt" src={sprites?.other["official-artwork"]?.front_default} alt={`${name}`} />
        </div>

        <div className="pokeDetail">
          <h3>Details:</h3>
          <table>
          <tbody>
            <tr>
              <td>NR:</td>
              <td>{id}</td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{renderType()}</td>
            </tr>
            <tr>
            <td>Abilities:</td>
            <td>{renderAbility()}</td>
            </tr>
            </tbody>
          </table>
          <div>
            <h3>Sprites:</h3>
            <img className="sprites" src={sprites.front_default} alt={`${name}`} />
            <img className="sprites" src={sprites.front_shiny} alt={`${name}`} />
            </div>
        </div>
    
        <div className="pokeStat">
          <h3>Base Stats:</h3>
          <table>
            <tbody>
            <tr>
              <td>HP:</td>
              <td>{stats[0].base_stat}</td>
            </tr>
            <tr>
              <td>Attack:</td>
              <td>{stats[1].base_stat}</td>
            </tr>
            <tr>
              <td>Defense:</td>
              <td>{stats[2].base_stat}</td>
            </tr>
            <tr>
              <td>Special-Attack:</td>
              <td>{stats[3].base_stat}</td>
            </tr>
            <tr>
              <td>Special-Defense:</td>
              <td>{stats[4].base_stat}</td>
            </tr>
            <tr>
              <td>Speed:</td>
              <td>{stats[5].base_stat}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="moveButtons">
        <button 
          className="loadButton" onClick={handleGoPrev} disabled={id === 1}>Prev
        </button>
        <button 
          className="backButton" onClick={() => history.goBack()}>Go Back
        </button>
        <button 
          className="loadButton" onClick={handleGoNext} disabled={id === 905}>Next
        </button>
      </div>

    </div>
  );
}

return renderPokemon();
}