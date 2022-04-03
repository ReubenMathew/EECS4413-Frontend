import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useAppContext } from "../state/AppContext";
export default function NavBar() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  function handleLogout() {
    dispatch({ type: "SET_LOGGED_OUT" });
    router.push("/catalog");
  }
  function profile() {
    if (state.isLoggedIn) {
      if (state.isAdmin) {
        return (
          <div className="flex space-x-2">
            <Button onClick={() => router.push("/admin")}>Admin</Button>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
        );
      } else {
        return (
          <div className="flex space-x-2">
            <Button onClick={() => router.push("/profile")}>Profile</Button>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
        );
      }
    } else {
      return (
        <div className="flex space-x-2">
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/Registration")}>Register</Button>
        </div>
      );
    }
  }
  return (
    <div className="flex space-x-2">
      <Button onClick={() => router.push("/catalog")}>Catalog</Button>
      <Button onClick={() => router.push("/shoppingCart")}>Cart</Button>
      {profile()}
    </div>
  );
}
