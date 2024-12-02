const API_BASE_URL = "http://localhost:3000/api";

export const fetchBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  if (!response.ok) throw new Error("Failed to fetch book");
  return response.json();
};

export const addBook = async (bookData) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error("Failed to add book");
  return response.json();
};
