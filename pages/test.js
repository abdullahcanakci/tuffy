import Head from "next/head";
import Tiptap from "views/components/Tiptap";

const Index = () => {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full flex  flex-col bg-[#323232]">
        <Tiptap />
      </div>
    </>
  );
};

export default Index;
