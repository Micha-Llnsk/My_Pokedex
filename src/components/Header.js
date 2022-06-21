import "./Header.css";
import { NavLink } from "react-router-dom";
import {useHistory} from "react-router-dom";

export default function Header() {

    const history = useHistory();

    function handleSubmit(e) {
        history.push(`/pokemon/${e.target.value}`);
        e.preventDefault();
    }

    return (
        <header>
            <nav className="header">
                <NavLink className="header__home" to="/">Pokédex</NavLink>
                <form onChange={handleSubmit} className="header__right">
                    <input 
                        className="header__input" 
                        name="search"
                        id="search"
                        type="search"
                        placeholder="Pokémon Name or Nr." 
                    />
                    <button className="header__button" type="submit" onClick={handleSubmit}>GO</button>
                </form>
            </nav>
        </header>
    );
}