import { session } from "utils";
import nextConnect from "next-connect";
import { hashPassword } from "utils/password";
import connectToDatabase from "utils/connectToDatabase";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "guest",
  database: true,
});

handler.use(session).post(async (req, res) => {
  const {
    db,
    body: { email, password },
  } = req;

  if (email == null || email == "" || password == "" || password == null) {
    res.status(422).json({ errors: { general: ["Wrong credentials"] } });
  }

  const maybeUser = await db.collection("users").findOne({ email: email });

  if (maybeUser) {
    res.status(422).json({ errors: ["E-mail already in use"] });
    return;
  }
  const hash = await hashPassword(password);

  let user = await db
    .collection("users")
    .insertOne({ email: email, password: hash });

  try {
    user = {
      isLoggedIn: true,
      email: user.email,
      id: user._id.toString(),
    };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export default handler;
