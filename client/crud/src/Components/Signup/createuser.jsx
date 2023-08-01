import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutation";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  console.log("Sf");
  let reactNavigate = useNavigate();
  const [createUser, { data }] = useMutation(CREATE_USER);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    await createUser({
      variables: {
        email: email,
        password: password,
        firstName: Firstname,
        lastName: Lastname,
      },
    });

    console.log(data);
    if (data) {
      console.log("data recived " + data);
      alert("User Created");
      reactNavigate("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create User</h1>
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
        <input
          type="text"
          placeholder="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />

        <button type="submit">Create User</button>
      </form>
    </>
  );
}

export default CreateUser;
