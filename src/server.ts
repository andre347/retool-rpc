import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: string;
}

let books: Book[] = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    publishedYear: "1949",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedYear: "1960",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedYear: "1925",
  },
];

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});

app.post("/books", (req: Request, res: Response) => {
  const book: Book = req.body;
  books.push(book);
  res.status(201).send(book);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
