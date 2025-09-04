import { Router } from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getBookBySlug,
  getAllBooks,
  getBooksByCategory,
  autocompleteSearch,
} from "../controllers/book.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";
const bookRouter = Router();

bookRouter.route("/create").post(verifyFirebaseToken, createBook);
bookRouter.route("/update/:slug").patch(verifyFirebaseToken, updateBook);
bookRouter.route("/delete/:slug").delete(verifyFirebaseToken, deleteBook);
bookRouter.route("/getbook/:slug").get(getBookBySlug);
bookRouter.route("/getbooks/:category").get(getBooksByCategory);
bookRouter.route("/getbooks").get(getAllBooks);
bookRouter.route("/autocomplete").get(autocompleteSearch);

export default bookRouter;
