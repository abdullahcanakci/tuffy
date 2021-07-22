import Head from "next/head";
import { useRef } from "react";

const Index = () => {
  const ref = useRef(null);
  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full flex  flex-col bg-[#323232]"></div>
    </>
  );
};

export default Index;
