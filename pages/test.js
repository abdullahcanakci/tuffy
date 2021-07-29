import Head from "next/head";
import { Button, ImagePicker, Pill } from "components";
import { useState } from "react";

const Index = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-[#323232]">
        <Pill onDelete="true" label="test" />
      </div>
    </>
  );
};

export default Index;
