import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

export default function SinglePokemonPage() {
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

    const { name, sprites } = pokemon;
    
  return (
    <section>
      <h2>{name}</h2>
      <img src={sprites?.other["official-artwork"]?.front_default} alt={`${name}`} />
    </section>
  );
}

return renderPokemon();
}
