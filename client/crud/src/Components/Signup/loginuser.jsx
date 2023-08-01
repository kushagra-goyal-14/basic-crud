import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TOKEN } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";

function LoginUser() {
  let reactNavigate = useNavigate();
  const [getToken, { data, loading, error }] = useLazyQuery(GET_TOKEN);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getToken({
      variables: {
        email: email,
        password: password,
      },
    });
    console.log(data);
    console.log("isloading" + loading);
    console.log("iserror" + error);
    if (data && data.getUserToken) {
      console.log("data recived " + data);
      localStorage.setItem("token", data.getUserToken);
      alert("User Logged in ");
      reactNavigate("/dashboard");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login User</h1>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Create User</button>
      </form>
    </>
  );
}

export default LoginUser;
