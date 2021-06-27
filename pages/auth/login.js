import { useUser } from "hooks";
import { fetcher } from "utils";

const Login = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email</span>
          <input type="text" name="email" required />
        </label>
        <label>
          <span>password</span>
          <input type="text" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
