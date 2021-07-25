import Head from "next/head";
import { Button, ImagePicker } from "components";
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
        <Button label="button" onClick={() => setVisible((x) => !x)} />
        <ImagePicker
          visible={visible}
          onCancel={() => setVisible(false)}
          onSelect={(image) => {
            console.log(image);
            setVisible(false);
          }}></ImagePicker>
      </div>
    </>
  );
};

export default Index;
