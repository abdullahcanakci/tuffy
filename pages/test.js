import { useUser } from "hooks";
import Head from "next/head";
import { Button, Pill, Spinner } from "views/components";
import { Dashboard } from "views/containers";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full flex  flex-col justify-center items-center">
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
        <h5>h5</h5>
      </div>
    </div>
  );
};

export default Index;
