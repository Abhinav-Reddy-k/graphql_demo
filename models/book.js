import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author_ids: {
    type: [String],
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
