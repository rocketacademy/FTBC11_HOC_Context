import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthForm from "./AuthForm";
import WithPokemon from "./withPoke";

function withAuth(Component) {
  return function WithAuth(props) {
    useEffect(() => {
      console.log("Mounted & Updated");

      onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed");
        if (user) {
          console.log("User logged in");
          setIsLoggedIn(true);
          setUser(user);
        }
      });
    }, []);

    const signOutAuth = () => {
      console.log("Signout");
      signOut(auth);
      setIsLoggedIn(false);
      setUser({});
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    return (
      <Component
        isLoggedIn={isLoggedIn}
        user={user}
        {...props}
        signOutAuth={signOutAuth}
      />
    );
  };
}

function Component(props) {
  return (
    <div>
      {props.isLoggedIn ? (
        <div>
          <p>Welcome {props.user.email}</p>
          <button onClick={props.signOutAuth}>SignOut</button>
          <WithPokemon />
        </div>
      ) : (
        <div>
          <AuthForm />
        </div>
      )}
    </div>
  );
}

const WithAuth = withAuth(Component);

export default WithAuth;
