import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../State/AppContext";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAppContext();

  async function authenticate() {
    // const users = await fetch("/api/getUsers").then((res) => res.json());

    // console.log(users);
    // users.map((user, index) => {
    //   if (user.email == username && user.password == password) {
    //     console.log("Sucsess!");
    //     dispatch({ type: "SET_LOGGED_IN" }); //set logged in to true
    //     dispatch({ type: "SET_USERNAME", data: user.name }); //set the username field in local state
    //     dispatch({ type: "SET_EMAIL", data: user.email }); //set the username field in local state
    //     setUsername(""); //reset username and password
    //     setPassword("");
    //     router.push("/Home"); //user the router api to navigate to the home page
    //   } else {
    //     console.log("Failure");
    //   }
    // });
    router.push("/Catalog");
  }
  // useEffect(() => {
  //   console.log("user logged in " + state.username);
  // }, [state.isLoggedIn, state.username]);
  return (
    <div>
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => authenticate()}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
