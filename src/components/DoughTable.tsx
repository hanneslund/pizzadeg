import { useRouter } from "next/router";
import useDoughs from "../hooks/useDoughs";
import { useMutateDb } from "../hooks/useMutateDb";
import log from "../lib/log";
import { now, supabase } from "../lib/supabaseClient";
import Button from "./Button";
import NumberInput from "./NumberInput";

type Props = {
  isCreating?: boolean;
  flourWeight: number;
  setFlourWeight?: (val: number) => void;
  waterPercentage: number;
  setWaterPercentage?: (val: number) => void;
  saltPercentage: number;
  setSaltPercentage?: (val: number) => void;
  yeastPercentage: number;
  setYeastPercentage?: (val: number) => void;
};

export default function DoughTable({
  isCreating,
  flourWeight,
  setFlourWeight,
  waterPercentage,
  setWaterPercentage,
  saltPercentage,
  setSaltPercentage,
  yeastPercentage,
  setYeastPercentage,
}: Props) {
  const [call, loading, error] = useMutateDb();
  const router = useRouter();
  const { mutate, doughs } = useDoughs();

  return (
    <div className="rounded-lg overflow-hidden border">
      <table className="w-full">
        <thead>
          <tr className="text-green-600 text-sm border-b">
            <th className="p-4 w-1/4 font-semibold">INGREDIENS</th>
            <th className="font-semibold">VIKT (g)</th>
            <th className="font-semibold">%</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="p-4 font-medium">Mjöl</td>
            <td className="p-4">
              {isCreating && setFlourWeight ? (
                <NumberInput value={flourWeight} onChange={setFlourWeight} />
              ) : (
                flourWeight
              )}
            </td>
            <td className="p-4">100</td>
          </tr>
          <tr className="bg-gray-50 border-t border-b">
            <td className="p-4 font-medium">Vatten</td>
            <td className="p-4">{(flourWeight * waterPercentage) / 100}</td>
            <td className="p-4">
              {isCreating && setWaterPercentage ? (
                <NumberInput
                  value={waterPercentage}
                  onChange={setWaterPercentage}
                />
              ) : (
                waterPercentage
              )}
            </td>
          </tr>
          <tr>
            <td className="p-4 font-medium">Salt</td>
            <td className="p-4">{(flourWeight * saltPercentage) / 100}</td>
            <td className="p-4">
              {isCreating && setSaltPercentage ? (
                <NumberInput
                  value={saltPercentage}
                  onChange={setSaltPercentage}
                />
              ) : (
                saltPercentage
              )}
            </td>
          </tr>
          <tr className="bg-gray-50 border-t">
            <td className="p-4 font-medium">Jäst</td>
            <td className="p-4">{(flourWeight * yeastPercentage) / 100}</td>
            <td className="p-4">
              {isCreating && setYeastPercentage ? (
                <NumberInput
                  value={yeastPercentage}
                  onChange={setYeastPercentage}
                />
              ) : (
                yeastPercentage
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {isCreating ? (
        <div className="p-4 flex items-center justify-between border-t">
          {error ? (
            <span className="text-red-700 ml-4">
              Kunde inte lägga till degen.
            </span>
          ) : (
            <div />
          )}
          <Button
            onClick={async () => {
              const params = {
                user_id: supabase.auth.user()?.id,
                flour_weight: flourWeight,
                salt_percentage: saltPercentage,
                water_percentage: waterPercentage,
                yeast_percentage: yeastPercentage,
                created: now(),
              };
              log("info", {
                call: "Create new dough",
                params,
                session: supabase.auth.session(),
              });
              const { data, error } = await call(
                supabase
                  .from("doughs")
                  .insert({
                    user_id: supabase.auth.user()?.id,
                    flour_weight: flourWeight,
                    salt_percentage: saltPercentage,
                    water_percentage: waterPercentage,
                    yeast_percentage: yeastPercentage,
                    created: now(),
                  })
                  .select("*")
              );

              if (error) {
                log("error", {
                  call: "Create new dough",
                  error,
                  session: supabase.auth.session(),
                });
              }

              if (!error && doughs) {
                await mutate([data[0], ...doughs]);
                router.push(`/deg/${data[0].id}`);
              }
            }}
            loading={loading}
          >
            Lägg till
          </Button>
        </div>
      ) : null}
    </div>
  );
}
