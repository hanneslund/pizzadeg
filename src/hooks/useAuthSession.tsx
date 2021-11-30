import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/gotrue-js";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import log from "../lib/log";

const AuthContext = createContext<Session | null>(null);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const cb = () => {
      const session = supabase.auth.session();
      if (
        document.visibilityState === "visible" &&
        session &&
        session.expires_at
      ) {
        const expiresAt = new Date(session.expires_at * 1000);
        if (new Date() > expiresAt) {
          log("info", { message: "Token expired, refresh session.", session });
          supabase.auth.refreshSession().catch(() => supabase.auth.signOut());
        }
      }
    };
    document.addEventListener("visibilitychange", cb);
    // window.addEventListener("focus", cb);
    return () => {
      document.removeEventListener("visibilitychange", cb);
      // window.removeEventListener("focus", cb);
    };
  }, []);

  useEffect(() => {
    setSession(supabase.auth.session());
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const mountedSession = session ?? supabase.auth.session();

    if (router.pathname === "/" && mountedSession) {
      router.replace("/me");
    } else if (router.pathname !== "/" && !mountedSession) {
      router.replace("/");
    }
  }, [router, session]);

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};

export const useAuthSession = () => useContext(AuthContext);
