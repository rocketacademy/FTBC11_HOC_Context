import logo from "./logo.svg";
import "./App.css";
import WithCount from "./Components/withCount";
import WithCountHook from "./Components/withCountHook";
import WithAuth from "./Components/withAuth";

import { useState, useEffect } from "react";
import WithPokemon from "./Components/withPoke";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WithAuth />
        {/* <WithCount /> */}
        {/* <WithCountHook /> */}

        {/* <WithPokemon /> */}
      </header>
    </div>
  );
}

export default App;
