import Head from "next/head";
import { useRef } from "react";
import { Pill } from "views/components";

const Index = () => {
  const ref = useRef(null);
  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full flex  flex-col bg-[#323232]">
        <div className="flex flex-row">
          <Pill label="label" onDelete={() => console.log("delete")} />
        </div>
      </div>
    </>
  );
};

export default Index;
