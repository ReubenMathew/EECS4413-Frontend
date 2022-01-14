import { useAppContext } from "../State/AppContext";

export default function Checkout() {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <p>This is the Checkout</p>
    </div>
  );
}
