import "tailwindcss/tailwind.css";
import { AppWrapper } from "../state/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}

export default MyApp;
