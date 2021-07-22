import { useParams } from "react-router-dom";

export default function SinglePokemonPage() {
  const params = useParams();
  return (
    <section>
      <p>Pokemon with the ID: {params.pokeId}</p>
    </section>
  );
}
