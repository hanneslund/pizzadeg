import { NextPage } from "next";
import Link from "next/link";

import Container from "../components/Container";
import { DoughListItem } from "../components/DoughListItem";
import useDoughs from "../hooks/useDoughs";
import Layout from "../components/Layout";
import ErrorBox from "../components/ErrorBox";
import LoadingText from "../components/LoadingText";

const Home: NextPage = () => {
  const { loading, error, doughs } = useDoughs();

  return (
    <Layout title="Mina degar">
      <Container className="px-4">
        <div className="my-8 mb-4 flex gap-x-4 items-center">
          <h1 className="text-2xl font-serif">Mina degar</h1>
          <Link href={`/deg/new`}>
            <a className="p-2 px-4 bg-green-500 border border-green-500 text-xs font-semibold rounded-md text-white hover:bg-white hover:text-green-500 transition-colors duration-150">
              + Ny
            </a>
          </Link>
        </div>

        {loading && <LoadingText>Hämtar degar</LoadingText>}

        {error && (
          <ErrorBox>Misslyckades att hämta degarna, försöker igen...</ErrorBox>
        )}

        {!loading &&
          !error &&
          doughs &&
          (doughs.length === 0 ? (
            <div className="border-2 h-14 border-dashed flex items-center justify-center text-gray-400 rounded-lg">
              Inga degar
            </div>
          ) : (
            <div className="flex flex-col">
              {doughs.map(({ id, created }) => (
                <DoughListItem key={id} id={id} created={new Date(created)} />
              ))}
            </div>
          ))}
      </Container>
    </Layout>
  );
};

export default Home;
