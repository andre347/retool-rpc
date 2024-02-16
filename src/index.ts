import { RetoolRPC } from "retoolrpc";
import "dotenv/config";

import { getAllBooks, addBook } from "./func";

const rpc = new RetoolRPC({
  apiToken: process.env.RETOOL_RPC_API_TOKEN || "api_token",
  host: process.env.RETOOL_RPC_HOST || "host",
  resourceId: process.env.RETOOL_RPC_RESOURCE_ID || "resource_id",
});

rpc.register({
  name: "helloWorld",
  arguments: {
    name: { type: "string", description: "Your name", required: true },
  },
  implementation: async (args, _context) => {
    return `Hello, ${args.name}!`;
  },
});

rpc.register({
  name: "fetchBooks",
  arguments: {},
  permissions: {
    // groupNames: ["nogroup"],
    // userEmails: ["aedevries19@gmail.com"],
  },
  implementation: async (args, _context) => {
    return await getAllBooks();
  },
});

rpc.register({
  name: "addBook",
  arguments: {
    id: {
      type: "string",
      description: "Enter the book id",
      required: true,
    },
    title: {
      type: "string",
      description: "Enter the book title",
      required: true,
    },
    author: {
      type: "string",
      description: "Enter the book author",
      required: true,
    },
    publishedYear: {
      type: "string",
      description: "Enter the book published year",
      required: true,
    },
  },
  implementation: async (args, _context) => {
    return await addBook(args);
  },
});

if (process.env.CLI_GENERATED_MESSAGE) {
  console.log("\n" + process.env.CLI_GENERATED_MESSAGE + "\n");
}

rpc.listen();
