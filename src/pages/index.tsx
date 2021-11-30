import { NextPage } from "next";
import Container from "../components/Container";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import EmailIcon from "../components/icons/EmailIcon";
import Button from "../components/Button";
import { useState } from "react";
import { AlertCircle } from "../components/icons/AlertCircle";
import { InboxIcon } from "../components/icons/InboxIcon";

const Home: NextPage = () => {
  const [state, setSate] = useState<"INIT" | "LOADING" | "SENT" | "ERROR">(
    "INIT"
  );

  return (
    <Layout title="Logga in">
      <Container className="content-height flex flex-col">
        {state !== "SENT" ? (
          <form
            onSubmit={async (e: any) => {
              e.preventDefault();

              setSate("LOADING");
              const email = e.currentTarget.elements.email.value;
              const { error } = await supabase.auth.signIn({ email });
              if (error) {
                setSate("ERROR");
              } else {
                setSate("SENT");
              }
            }}
            className="flex-grow flex flex-col items-center justify-center gap-y-3"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="E-postadress"
              className="w-80 h-12 px-4 border rounded-md appearance-none"
            />
            <Button
              error={state === "ERROR"}
              loading={state === "LOADING"}
              disabled={state !== "INIT" && state !== "ERROR"}
              className="w-80"
              type="submit"
            >
              <div className="flex items-center w-full text-sm font-normal">
                {state === "ERROR" ? <AlertCircle /> : <EmailIcon />}
                <span className="flex-grow">Skicka magisk länk</span>
              </div>
            </Button>
          </form>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-lg">
            <div className="flex items-center gap-2">
              <InboxIcon className="text-gray-700" /> Magisk länk skickad.
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
