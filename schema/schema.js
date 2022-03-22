import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Author from "../models/author.js";
import Book from "../models/book.js";

const bookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authors: {
      type: new GraphQLList(authorType),
      resolve: (parent, args) => {
        return Author.find({ _id: { $in: parent.author_ids } });
      },
    },
  }),
});

const authorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLFloat },
    books: {
      type: new GraphQLList(bookType),
      resolve: (parent, args) => {
        return Book.find({ author_ids: parent.id });
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: bookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Book.findById(args.id);
      },
    },
    author: {
      type: authorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent, args) {
        return Author.find();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: authorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    updateAuthor: {
      type: authorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
      },
      resolve(parent, args) {
        Author.findByIdAndUpdate(args.id, {
          name: args.name,
          age: args.age,
        });
        return Author.findById(args.id);
      },
    },
    addBook: {
      type: bookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author_ids: { type: GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          author_ids: args.author_ids,
        });
        return book.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: rootQuery,
  mutation,
});
