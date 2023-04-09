import { type AppType } from "next/app";
import { ThemeProvider } from "next-themes";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "src/styles/globals.css";
import { Layout } from "../layouts/Layout";
import { trpc } from "src/utils/trpc";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
