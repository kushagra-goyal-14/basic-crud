import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import CreateUser from "./Components/Signup/createuser";
import LoginUser from "./Components/Signup/loginuser";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/dashboard";
import { Navigate } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

const token = localStorage.getItem("token");
const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/register" element={<CreateUser></CreateUser>} />
          <Route path="/login" element={<LoginUser></LoginUser>} />
          <Route
            path="/dashboard"
            element={
              localStorage.getItem("token") ? (
                <Dashboard></Dashboard>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
