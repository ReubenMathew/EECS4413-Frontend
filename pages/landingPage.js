import { useRouter } from "next/router";
import { useAppContext } from "../state/AppContext";
export default function LandingPage() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  return (
    <div>
      <p>This is the landing page!</p>
      <button onClick={() => router.push("/Catalog")}>Enter Shop Cart</button>
    </div>
  );
}
