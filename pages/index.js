import { useUser } from "hooks";
import Head from "next/head";

const Home = () => {
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

      <main>
        <h1>Welcome</h1>
      </main>
    </div>
  );
};

export default Home;
