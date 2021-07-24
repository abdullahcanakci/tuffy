import connectToDatabase from "utils/connectToDatabase";

export default async function DatabaseMiddleware(req, res, next) {
  const { db } = await connectToDatabase();

  req.db = db;
  next();
}
