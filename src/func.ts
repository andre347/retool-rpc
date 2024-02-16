interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: string;
}

export async function getAllBooks(): Promise<Book[]> {
  const response = await (
    await import("node-fetch")
  ).default("http://localhost:3000/books");
  return response.json() as Promise<Book[]>;
}

export async function addBook(book: Book): Promise<Book> {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  return response.json() as Promise<Book>;
}
