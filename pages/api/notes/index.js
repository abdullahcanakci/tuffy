import { session } from "utils";
import nextConnect from "next-connect";
import { hashPassword } from "utils/password";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  /* 
  const { db } = await connectToDatabase();
  const tags = await db
    .collection("tags")
    .find({}, { _id: 1, name: 1 })
    .toArray();

  res.json(tags.map((t) => ({ id: t._id.toString(), name: t.name }))); */

  res.json([
    {
      id: 1,
      title: "Fusion Energy",
      abstract: "Generating endless energy with",
      color: "#ec5453",
      date: "2012-12-19T06:01:17.171Z",
    },
    {
      id: 2,
      title: "But with some guidance and explanation",
      abstract: "Differentiate yourself and the",
      date: "2012-12-19T06:01:17.171Z",
    },
    {
      id: 3,
      title: "New note",
      abstract: "",
      date: "2012-12-19T06:01:17.171Z",
    },
    {
      id: 4,
      title: "Activation code",
      abstract: "KFLS-SLF12-1233-8LMS",
      color: "#23350d",
      date: "2016-01-03T06:01:17.171Z",
    },
    {
      id: 5,
      title: "Post-Workout Nutrition: What to Eat After asdas",
      abstract: "You put a lot of effort into your",
      color: "#fac92f",
      date: "2020-06-30T12:01:17.171Z",
    },
  ]);
});

export default handler;
