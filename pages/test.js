import Head from "next/head";
import { ImagePicker } from "components";
import { useState } from "react";

const Index = () => {
  const [time, setTime] = useState(0);

  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-[#323232]">
        <ImagePicker time={time} />
      </div>
    </>
  );
};

export default Index;
