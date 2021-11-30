import "tailwindcss/tailwind.css";
import "./base.css";

import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../hooks/useAuthSession";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default MyApp;
