import { StateProvider } from "../stateProvider";
import reducer, { initialState } from "./../reducer";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>JayGym</title>
        <meta
          name="description"
          content="A site that recommends exercises that will change your life."
        />

        <meta property="og:url" content="https://jay-gym.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JayGym" />
        <meta
          property="og:description"
          content="A site that recommends exercises that will change your life."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dubinx/image/upload/v1657130338/Screenshot_2022-07-06_185551_lp0opc.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="jay-gym.vercel.app" />
        <meta property="twitter:url" content="https://jay-gym.vercel.app/" />
        <meta name="twitter:title" content="JayGym" />
        <meta
          name="twitter:description"
          content="A site that recommends exercises that will change your life."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dubinx/image/upload/v1657130338/Screenshot_2022-07-06_185551_lp0opc.jpg"
        />
      </Head>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
