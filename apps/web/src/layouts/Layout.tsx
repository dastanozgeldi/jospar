import Head from "next/head";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Poppins } from "next/font/google";
import { Sidebar } from "./Sidebar";

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const links = [
    { label: "Home", href: "/" },
    { label: "Chat", href: "/chat" },
  ];

  const [parent] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Jospar is a text generation app based on GPT3 model to help self-taught people speed up their learning curve."
        />
        <meta name="author" content="Dastan Özgeldi" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Jospar - Your Learning Assistant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@dastanozgeldi" />
        <meta
          name="twitter:image"
          content="https://jospar.dosek.xyz/card.png"
        />
        <meta property="og:site_name" content="Jospar" />
        <meta name="og:title" content="Jospar - Your Learning Assistant" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://jospar.dosek.xyz/card.png" />
        <title>Jospar - Your Learning Assistant</title>
      </Head>
      <div className={poppins.className}>
        <div className="flex">
          <div className="fixed w-1/5 border-r border-r-gray-600">
            <Sidebar mounted={mounted} links={links} />
          </div>
          <main ref={parent} className="mx-auto ml-[20%] w-full p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
