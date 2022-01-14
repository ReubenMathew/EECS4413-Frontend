import { useRouter } from "next/router";
import { useAppContext } from "../State/AppContext";

export default function Catalog() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  function testLogOut() {
    dispatch({ type: "SET_LOGGED_OUT" }); //set logged in to true
    router.push("/LandingPage");
  }
  return (
    <div>
      <p>This is the catalog view</p>
      <button onClick={() => testLogOut()}>Test log out</button>
    </div>
  );
}
