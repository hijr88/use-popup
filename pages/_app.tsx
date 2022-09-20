import PopupProvider from "../libs/popup/Provider";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PopupProvider>
      <Component {...pageProps} />
    </PopupProvider>
  );
}

export default MyApp;
