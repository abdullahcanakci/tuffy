import { session } from "utils";
import nextConnect from "next-connect";
import { hashPassword } from "utils/password";
import connectToDatabase from "utils/connectToDatabase";

const handler = nextConnect();

handler.use(session).post(async (req, res) => {
  const { email, password } = await req.body;

  if (email == null || email == "" || password == "" || password == null) {
    res.status(422).json({ errors: { general: ["Wrong credentials"] } });
  }

  const { db } = await connectToDatabase();

  const maybeUser = await db.collection("users").findOne({ email: email });

  if (maybeUser) {
    res.status(422).json({ errors: ["E-mail already in use"] });
    return;
  }
  const hash = hashPassword(password);
  let user = await db
    .collection("users")
    .insertOne({ email: email, password: hash });

  try {
    user = { isLoggedIn: true };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export default handler;
