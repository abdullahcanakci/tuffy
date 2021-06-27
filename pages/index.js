import { useTags } from "hooks";
import { useUser } from "hooks";
import Head from "next/head";
import { Dashboard } from "views/containers";

const Index = () => {
  const { user } = useUser({ redirectTo: "/auth/login" });
  if (!user || !user.isLoggedIn) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Welcome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
};

export default Index;
