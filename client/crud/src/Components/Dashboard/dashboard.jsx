import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/mutation";
import { DELETE_USER } from "../../graphql/mutation";

function Dashboard() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const [user, setuser] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [updateUser, { updateData }] = useMutation(UPDATE_USER);
  const [deleteUser, { deleteData }] = useMutation(DELETE_USER);

  function DeleteUser() {
    deleteUser({
      variables: {
        id: user.id,
      },
    });
    if (deleteData) {
      alert("User Deleted");
      localStorage.removeItem("token");
      window.location.reload();
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    await updateUser({
      variables: {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });
    console.log("updateData");
    window.alert("User Updated");
    if (updateData && updateData.updateUser) {
      alert("User Updated");
      setuser(updateData.updateUser);
    }
  }

  useEffect(() => {
    if (data) {
      setuser(data.getCurrentLoggedInUser);
      console.log(data.getCurrentLoggedInUser);
    }
    if (error) {
      console.log(error);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1>Dashboard</h1>

          <h2> FirstName - {user?.firstName}</h2>
          <h2>LastName - {user?.lastName}</h2>
          <h2>Email - {user?.email}</h2>
          <h2>Id - {user?.id}</h2>

          <h1>Update User</h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="firstname"
              onChange={(e) => setfirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="lastname"
              onChange={(e) => setlastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit">Update User</button>
          </form>

          <h1>Delete User</h1>
          <button
            onClick={() => {
              DeleteUser();
              alert("User Deleted");
              localStorage.removeItem("token");
              window.location.reload("/login");
            }}
          >
            Delete User
          </button>

          <button
            value="logout"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",

              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              window.alert("User Logged Out");
              window.location.reload("/login");
            }}
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default Dashboard;
