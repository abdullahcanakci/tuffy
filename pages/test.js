import { useUser } from "hooks";
import Head from "next/head";
import { Pill, Spinner } from "views/components";
import { Dashboard } from "views/containers";

const Index = () => {
  const { user } = useUser({ redirectTo: "/auth/login" });
  if (!user || !user.isLoggedIn) {
    return (
      <div className="w-full h-screen bg-[#1f1f1f]">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full flex justify-center items-center">
        <Pill label="test" onDelete />
      </div>
    </div>
  );
};

export default Index;
