import Head from "next/head";
import dynamic from "next/dynamic";
const Quill = dynamic(() => import("views/components/Editor/Quill"), {
  ssr: false,
});

const Index = () => {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full">a</div>
      <div className="flex flex-col min-h-full">
        <Quill />
      </div>
    </>
  );
};

export default Index;
