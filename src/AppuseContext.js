import "./App.css";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthForm from "./Components/AuthForm";

import React, { useState, useEffect, createContext, Component } from "react";
import Profile from "./Components/Profile";
import WithPokemon from "./Components/withPoke";

const intialData = {
  email: "test",
  name: "tester",
};

export const UserContext = createContext(intialData);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const callMe = () => {
    console.log("CALL ME");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in");
        setIsLoggedIn(true);
        setUser(user);
      }
    });
  });

  const context = {
    user,
    callMe,
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <div>
            <h2>Welcome back</h2>
            <button
              onClick={() => {
                signOut(auth);
                setIsLoggedIn(false);
                setUser({});
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <AuthForm />
        )}

        <UserContext.Provider value={context}>
          {/* Any Component in here can get access to the user information once the user is logged in. */}
          <Profile />
          <WithPokemon />
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
