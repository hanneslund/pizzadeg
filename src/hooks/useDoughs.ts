import useSWR from "swr";
import log from "../lib/log";
import { supabase } from "../lib/supabaseClient";
import { useAuthSession } from "./useAuthSession";

type Dough = {
  id: number;
  flour_weight: number;
  water_percentage: number;
  salt_percentage: number;
  yeast_percentage: number;
  created: string;

  mixed: string;
  balled: string;
  done: string;
};

export default function useDoughs() {
  const session = useAuthSession();
  const { data, error, mutate } = useSWR(
    session ? "doughs" : null,
    async () => {
      const { data, error } = await supabase
        .from<Dough>("doughs")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        log("error", {
          call: "useDoughs",
          error,
          session: supabase.auth.session(),
        });
        throw error;
      }
      return data;
    }
  );

  function get(id: number): Dough | undefined {
    return data?.find((dough) => dough.id === Number(id));
  }

  return {
    doughs: data,
    loading: !error && !data,
    error,
    mutate,
    get,
  };
}

export type DoughStep = {
  id: number;
  dough_id: number;
  step: string;
  created: string;
};

export function useDoughSteps(doughId?: number) {
  const session = useAuthSession();
  const { data, error, mutate } = useSWR(
    session && doughId ? `doughstep/${doughId}` : null,
    async () => {
      if (!doughId) {
        throw new Error("No dough id");
      }
      const { data, error } = await supabase
        .from<DoughStep>("dough_steps")
        .select("*")
        .eq("dough_id", doughId)
        .order("created", { ascending: false });
      if (error) {
        log("error", {
          call: "useDoughSteps",
          error,
          session: supabase.auth.session(),
        });
        throw error;
      }
      return data;
    }
  );

  return {
    doughSteps: data,
    loading: !error && !data,
    error,
    mutate,
  };
}
