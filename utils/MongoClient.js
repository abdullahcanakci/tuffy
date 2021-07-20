import connectToDatabase from "./connectToDatabase";

const MongoClient = ({ user_id = null }) => {
  let collection = null;
  const client = null;

  const connect = async () => {
    const { db } = await connectToDatabase();
    const client = db;
  };
};

export default MongoClient;
