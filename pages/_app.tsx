import type { AppProps } from "next/app";

require("../styles/globals.less");
require("../styles/antd.less");

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
