import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import PokemonListPage from "./pages/PokemonListPage";
import SinglePokemonPage from "./pages/SinglePokemonPage";
import Header from "./components/Header";

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>

        <main className="App__content">
          <Switch>
            <Route path="/pokemon/:pokeId">
              <SinglePokemonPage />
            </Route>
            <Route path="/pokemon">
              <PokemonListPage />
            </Route>
            <Route path="/">
              <Redirect to="/pokemon" />
            </Route>
          </Switch>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
