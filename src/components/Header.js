import "./Header.css";
import { NavLink } from "react-router-dom";
import {useHistory} from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
    const [search, setSearch] = useState("");
    const history = useHistory();

    useEffect(() => {
        history.push(`/pokemon/${search}`);
    }, [search, history]);

    function handleSubmit(e) {
        e.preventDefault();
        setSearch(e.target[0].value);
    }

    return (
        <header>
            <nav className="header">
                <NavLink className="header__home" to="/">Pokédex</NavLink>
                <form onSubmit={handleSubmit} className="header__right">
                    <input 
                        className="header__input" 
                        name="search"
                        id="search"
                        type="search"
                        placeholder="Pokémon Name or Nr." 
                    />
                    <button className="header__button" type="submit">GO</button>
                </form>
            </nav>
        </header>
    );
}