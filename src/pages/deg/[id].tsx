import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import Container from "../../components/Container";
import DoughTable from "../../components/DoughTable";
import DoughStep from "../../components/DoughStep";
import Layout from "../../components/Layout";
import useDoughs, { useDoughSteps } from "../../hooks/useDoughs";
import Button from "../../components/Button";
import { useInsertDoughStep, useUpdateDate } from "../../hooks/useMutateDb";
import ErrorBox from "../../components/ErrorBox";
import LoadingText from "../../components/LoadingText";

const Deg: NextPage = () => {
  const [stepInput, setStepInput] = useState("");
  const [mutationError, setMutationError] = useState(false);

  const [insertStep, insertStepLoading] = useInsertDoughStep();

  const {
    query: { id },
    push,
  } = useRouter();

  const { get, error: doughsError, loading: doughsLoading } = useDoughs();
  const dough = get(id as any);

  const {
    doughSteps,
    error: doughStepsError,
    loading: doughStepsLoading,
  } = useDoughSteps(dough?.id);

  useEffect(() => {
    if (!doughsLoading && !doughsError && !dough) {
      push("/");
    }
  }, [doughsLoading, doughsError, dough, push]);

  const allSteps: {
    id: string | number;
    name: string;
    icon?: ReactNode;
    date: Date;
  }[] = (doughSteps ?? []).map(({ id, step, created }) => ({
    id,
    name: step,
    date: new Date(created),
  }));
  if (dough?.done) {
    allSteps.push({
      id: "done",
      name: "Klar!",
      icon: "🍕",
      date: new Date(dough.done),
    });
  }
  if (dough?.balled) {
    allSteps.push({
      id: "balled",
      name: "Bollad",
      icon: "👐",
      date: new Date(dough.balled),
    });
  }
  if (dough?.mixed) {
    allSteps.push({
      id: "mixed",
      name: "Blandad",
      icon: "🌀",
      date: new Date(dough.mixed),
    });
  }
  allSteps.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return (
    <Layout title={id ? `#${id}` : "Jäser..."} loading={!dough}>
      {dough ? (
        <Container className="p-4">
          <h1 className="text-2xl mb-4 mt-2 font-serif">Deg #{id}</h1>
          <DoughTable
            flourWeight={dough.flour_weight}
            waterPercentage={dough.water_percentage}
            saltPercentage={dough.salt_percentage}
            yeastPercentage={dough.yeast_percentage}
          />

          <h2 className="text-xl mt-8 font-serif">Steg för deg</h2>
          {mutationError && (
            <div className="text-sm inline-block p-4 border border-red-400 text-red-600 my-2 rounded-md">
              💥 Något gick fel, försök igen. 💥
            </div>
          )}

          <div className="py-4">
            {doughStepsError && (
              <ErrorBox>
                Misslyckades att hämta deginfo, försöker igen...
              </ErrorBox>
            )}

            {doughStepsLoading && <LoadingText>Hämtar deginfo</LoadingText>}

            {!doughStepsLoading && !doughStepsError && doughSteps && (
              <>
                {!dough.done ? (
                  <div className="flex gap-4 mb-6">
                    {!dough.mixed ? (
                      <StepButton
                        doughId={dough.id}
                        column="mixed"
                        setError={setMutationError}
                      >
                        🌀 Blandad
                      </StepButton>
                    ) : null}

                    {dough.mixed && !dough.balled ? (
                      <StepButton
                        doughId={dough.id}
                        column="balled"
                        setError={setMutationError}
                      >
                        👐 Bollad
                      </StepButton>
                    ) : null}

                    {dough.mixed && dough.balled ? (
                      <StepButton
                        doughId={dough.id}
                        column="done"
                        setError={setMutationError}
                      >
                        🍕 Klar!
                      </StepButton>
                    ) : null}

                    <div className="flex flex-1 border rounded-md overflow-hidden border-green-500">
                      <input
                        disabled={insertStepLoading}
                        value={stepInput}
                        onChange={(e) => {
                          setStepInput(e.target.value);
                        }}
                        type="text"
                        className="w-0 flex-1 px-4 text-sm appearance-none"
                        placeholder="Fritext"
                      />
                      <Button
                        disabled={stepInput.length === 0}
                        className="border-none rounded-none"
                        loading={insertStepLoading}
                        onClick={async () => {
                          setMutationError(false);
                          const { error } = await insertStep({
                            doughId: dough.id,
                            step: stepInput,
                          });
                          if (!error) {
                            setStepInput("");
                          }
                          setMutationError(Boolean(error));
                        }}
                        outlined
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ) : null}

                <div className="pl-2">
                  {allSteps.map(({ id, name, icon, date }) => (
                    <DoughStep
                      key={id}
                      name={name}
                      text={`${date
                        .toLocaleTimeString("sv-SE")
                        .slice(0, 5)} - ${date.toLocaleDateString("sv-SE")}`}
                      icon={icon}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Container>
      ) : null}
    </Layout>
  );
};

type StepButtonProps = {
  children: ReactNode;
  doughId: number;
  column: string;
  setError: (isError: boolean) => void;
};
const StepButton = ({
  children,
  setError,
  doughId,
  column,
}: StepButtonProps) => {
  const [updateDate, updateLoading] = useUpdateDate();

  return (
    <Button
      className="flex-grow-[0.2]"
      loading={updateLoading}
      onClick={async () => {
        setError(false);
        const { error } = await updateDate({
          id: doughId,
          column,
        });
        setError(Boolean(error));
      }}
      outlined
    >
      {children}
    </Button>
  );
};

export default Deg;
