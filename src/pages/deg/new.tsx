import { useState } from "react";
import { NextPage } from "next";

import Container from "../../components/Container";
import DoughTable from "../../components/DoughTable";
import Layout from "../../components/Layout";

const Deg: NextPage = () => {
  const [flourWeight, setFlourWeight] = useState(1000);
  const [waterPercentage, setWaterPercentage] = useState(66);
  const [saltPercentage, setSaltPercentage] = useState(2.8);
  const [yeastPercentage, setYeastPercentage] = useState(0.02);

  return (
    <Layout title="Ny deg">
      <Container className="px-4 pt-8">
        <DoughTable
          isCreating
          flourWeight={flourWeight}
          setFlourWeight={setFlourWeight}
          waterPercentage={waterPercentage}
          setWaterPercentage={setWaterPercentage}
          saltPercentage={saltPercentage}
          setSaltPercentage={setSaltPercentage}
          yeastPercentage={yeastPercentage}
          setYeastPercentage={setYeastPercentage}
        />
      </Container>
    </Layout>
  );
};

export default Deg;
