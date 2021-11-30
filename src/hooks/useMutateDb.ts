import { useState } from "react";
import { mutate } from "swr";
import log from "../lib/log";
import { now, supabase } from "../lib/supabaseClient";
import useDoughs, { DoughStep } from "./useDoughs";

export function useMutateDb(): [
  (dbCall: any) => Promise<any>,
  boolean,
  null | Object
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function call(dbCall: Promise<any>) {
    if (!loading) setLoading(true);
    setError(null);

    const { data, error } = await dbCall;
    if (error) {
      log("error", {
        call: "useMutateDb",
        error,
        session: supabase.auth.session(),
      });
      setError(error);
    }
    setLoading(false);
    return { data, error };
  }

  return [call, loading, error];
}

export function useUpdateDate(): [
  (dbCall: { column: string; id: number }) => Promise<any>,
  boolean,
  null | Object
] {
  const { doughs, mutate } = useDoughs();
  const [innerCall, loading, error] = useMutateDb();

  async function call({ column, id }: { column: string; id: number }) {
    log("info", {
      call: "Update date",
      column,
      id,
      session: supabase.auth.session(),
    });
    const { data, error } = await innerCall(
      supabase
        .from("doughs")
        .update({ [column]: now() })
        .eq("id", id)
        .select("*")
    );
    if (!error) {
      mutate(
        doughs
          ? doughs.map((dough) => {
              if (dough.id === id) {
                return {
                  ...dough,
                  [column]: data[0][column],
                };
              }
              return dough;
            })
          : null
      );
    }

    return { data, error };
  }

  return [call, loading, error];
}

export function useInsertDoughStep(): [
  (dbCall: { doughId: number; step: string }) => Promise<any>,
  boolean,
  null | Object
] {
  const [innerCall, loading, error] = useMutateDb();

  async function call({ doughId, step }: { doughId: number; step: string }) {
    log("info", {
      call: "Insert dough step",
      doughId,
      step,
      session: supabase.auth.session(),
    });
    const { data, error } = await innerCall(
      supabase
        .from("dough_steps")
        .insert({
          step,
          dough_id: doughId,
          created: now(),
        })
        .select("*")
    );
    if (!error) {
      mutate(`doughstep/${doughId}`, (steps: DoughStep[]) => [
        data[0],
        ...steps,
      ]);
    }

    return { data, error };
  }

  return [call, loading, error];
}
