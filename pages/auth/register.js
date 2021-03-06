import { useUser } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserService } from "services";
import { fetcher } from "utils";
import { Button, Card } from "views/components";
import { Input } from "views/components/Form";
import { CenterLayout } from "views/containers";

const Login = () => {
  useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const router = useRouter();
  useEffect(() => {
    router.prefetch("/auth/login");
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    UserService.register(
      event.currentTarget.email.value,
      event.currentTarget.password.value
    );
  };

  return (
    <CenterLayout>
      <Card style={{ minWidth: "400px" }} className="py-8">
        <div className="px-4">
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4">
            <Input type="email" label="Email" />
            <Input type="password" label="Password" />
            <div className="flex flex-row gap-2 mt-8">
              <Button
                type="button"
                label="Login"
                style="secondary"
                onClick={() => router.push("/auth/login")}
              />
              <Button type="submit" label="Register" />
            </div>
          </div>
        </form>
      </Card>
    </CenterLayout>
  );
};

export default Login;
