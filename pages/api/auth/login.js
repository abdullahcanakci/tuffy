import { checkPassword } from "utils/password";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "guest",
  database: true,
});

handler.post(async (req, res) => {
  const {
    db,
    body: { email, password },
  } = req;

  if (email == null || email == "" || password == "" || password == null) {
    res.status(422).json({ errors: ["Wrong credentials"] });
    return;
  }

  const user = await db.collection("users").findOne({ email: email });

  if (!user) {
    res.status(422).json({ errors: { general: ["Wrong credentials"] } });
    return;
  }

  const isValid = await checkPassword(user.password, password);

  if (!isValid) {
    res.status(403).json({ errors: { general: ["Wrong credentials"] } });
    return;
  }

  try {
    const userData = {
      isLoggedIn: true,
      email: user.email,
      id: user._id.toString(),
    };
    req.session.set("user", userData);
    await req.session.save();
    res.json(userData);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export default handler;
