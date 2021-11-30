import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { supabase } from "../lib/supabaseClient";
import Container from "./Container";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import { Spinner } from "./icons/Spinner";

import logo from "../../public/logo.png";

type Props = {
  children: ReactNode;
  title: string;
  loading?: boolean;
};

export default function Layout({ children, title, loading }: Props) {
  const { pathname } = useRouter();
  const loggedIn = Boolean(useAuthSession());

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="border-b">
        <Container className="flex h-16 px-4 justify-between items-center">
          {pathname === "/me" || !loggedIn ? (
            <Image
              src={logo}
              alt="The sites logo. Picture of a slice of pizza with eyes and mouth."
              width={40}
              height={40}
            />
          ) : (
            <Link href="/me">
              <a className="p-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-150 flex">
                <ChevronLeftIcon />
                Tillbaka
              </a>
            </Link>
          )}
          {loggedIn && (
            <button
              className="p-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-150 text-gray-500 text-xs"
              onClick={() => supabase.auth.signOut()}
            >
              Logga ut
            </button>
          )}
        </Container>
      </header>
      {!loading ? (
        children
      ) : (
        <Container className="flex items-center justify-center pt-12">
          <Spinner />
        </Container>
      )}
    </>
  );
}
