import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../AppuseContext";

function withPokemon(Component) {
  return function WithPokemon(props) {
    const [pokemon, setPokemon] = useState([]);
    const [input, setInput] = useState("");

    const getPokemon = async () => {
      let pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
      let info = pokemon.data;
      setPokemon((state) => [...state, info]);
    };

    const addPokemon = async () => {
      let pokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${input}`
      );
      let info = pokemon.data;
      setPokemon((state) => [...state, info]);
      setInput("");
    };

    useEffect(() => {
      console.log("Mounted & Updated");
      getPokemon();
    }, []);

    return (
      <Component
        pokemon={pokemon}
        input={input}
        addPokemon={addPokemon}
        {...props}
        setPokemon={setPokemon}
        setInput={setInput}
      />
    );
  };
}

function MyComponent(props) {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div>
      Pokemon:
      {props.pokemon && props.pokemon.length > 0 ? (
        <div>
          {props.pokemon.map((poke) => (
            <div>
              <h3>{poke.name}</h3>{" "}
              <img src={poke.sprites.front_default} alt={poke.name} />{" "}
              <h4>{poke.weight}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p>No Pokemon here</p>
      )}
      <label>Add new Pokemon {user.email}</label>
      <input
        type="text"
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
        placeholder="Add in a Pokemon name"
      />{" "}
      <button onClick={props.addPokemon}>Add new Pokemon</button>
      <button onClick={user.callMe}>Call me!</button>
    </div>
  );
}

const WithPokemon = withPokemon(MyComponent);

export default WithPokemon;
