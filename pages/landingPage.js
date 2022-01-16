import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div>
      <p>This is the landing page!</p>
      <button onClick={() => router.push("/catalog")}>Enter Shop Cart</button>
    </div>
  );
}
