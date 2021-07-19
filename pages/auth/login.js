import { useUser } from "hooks";
import { useRouter } from "next/router";
import { fetcher } from "utils";
import { Button, Card } from "views/components";
import { Input } from "views/components/Form";
import { CenterLayout } from "views/containers";
import { useEffect } from "react";

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const router = useRouter();

  useEffect(() => {
    router.prefetch("/auth/register");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      };
      const maybeUser = await fetcher("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      mutateUser(maybeUser);
    } catch (error) {
      console.error("An error occurred while logging in", error);
    }
  };

  return (
    <CenterLayout>
      <Card style={{ minWidth: "400px" }} className="py-8">
        <div className="px-4">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4">
            <Input type="email" label="Email" />
            <Input type="password" label="Password" />
            <div className="flex flex-row gap-2 mt-8">
              <Button
                type="button"
                label="Register"
                style="secondary"
                onClick={() => router.push("/auth/register")}
              />
              <Button type="submit" label="Login" />
            </div>
          </div>
        </form>
      </Card>
    </CenterLayout>
  );
};

export default Login;
