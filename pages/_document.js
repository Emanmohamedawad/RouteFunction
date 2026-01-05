// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { i18n } from "../next-i18next.config";

export default class MyDocument extends Document {
  render() {
    const currentLocale =
      (this.props?.__NEXT_DATA__?.locale) ||
      i18n?.defaultLocale ||
      "en";

    const dir = currentLocale === "ar" ? "rtl" : "ltr";


    return (
      <Html lang={currentLocale} dir={dir}>
        <Head>


        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
