import { UserContext } from "../AppuseContext";
import { useContext } from "react";

export default function Profile() {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <div>
      <div>
        {user.user.email ? (
          <div>
            {" "}
            <h3>Email: {user.user.email} </h3>
            <h4>User ID: {user.user.uid}</h4>
            <h5>Acces token: {user.user.accessToken}</h5>
          </div>
        ) : null}
      </div>
    </div>
  );
}
