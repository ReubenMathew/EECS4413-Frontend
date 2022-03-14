import "../styles/globals.css";
import { AppWrapper } from "../state/AppContext";
import { NextUIProvider } from "@nextui-org/react";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </AppWrapper>
    </>
  );
}

export default MyApp;
