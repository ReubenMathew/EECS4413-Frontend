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

  async function handleCart() {
    const visit = await fetch(
      `https://eecs4413-backend-production.up.railway.app/api/analytics/website/usage`,
      {
        method: "POST",
        body: JSON.stringify({
          ip_address: "1.27.0.0.0",
          event: 2,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      }
    );
    router.push("/shoppingCart");
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
          <Button onClick={() => router.push("/registration")}>Register</Button>
        </div>
      );
    }
  }
  return (
    <>
      <div className="flex space-x-2 justify-center">
        <Button onClick={() => router.push("/catalog")}>Catalog</Button>
        <Button onClick={() => handleCart()}>Cart</Button>

        {profile()}
      </div>
      <div>
        <p></p>
      </div>
    </>
  );
}
