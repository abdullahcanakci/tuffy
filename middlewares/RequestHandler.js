import nextConnect from "next-connect";
import AuthMiddleware from "./auth/AuthMiddleware";
import SessionMiddleware from "./auth/SessionMiddleware";
import DatabaseMiddleware from "./DatabaseMiddleware";
import UploadMiddleware from "./UploadMiddleware";

export default function RequestHandler(options = {}) {
  const handler = nextConnect();

  if (options.session) {
    handler.use(SessionMiddleware);
  }

  if (options.auth) {
    handler.use(AuthMiddleware);
  }
  if (options.files) {
    handler.use(
      UploadMiddleware.array(`${options.files.field}`, options.files.count)
    );
  }
  if (options.database) {
    handler.use(DatabaseMiddleware);
  }

  return handler;
}
