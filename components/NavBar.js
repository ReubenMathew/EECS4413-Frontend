import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <div className="flex space-x-2">
      <Button onClick={() => router.push("/catalog")}>Catalog</Button>
      <Button onClick={() => router.push("/shoppingCart")}>Cart</Button>
    </div>
  );
}
