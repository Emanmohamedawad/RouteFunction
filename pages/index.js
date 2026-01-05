// pages/index.js
import Head from "next/head";
import dynamic from "next/dynamic";
import Hero from "@/components/home/HeroSection"; // keep hero SSR for LCP
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Home({ title, description, image }) {
  return (
    <>
      <Head>
        <title>Test</title>
        <meta name="description" content={description} />
        {image && <meta property="og:image" content={image} />}
      </Head>

      <Hero />

      <div>

      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const meta = {
    title: "Miyar",
    description:
      "Miyar",
  };

  return {
    props: {
      ...meta,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
