import { createSignal, createEffect, onMount } from "solid-js";
import { Book } from "~/types/book";

export function useBooks() {
  // Use a shared signal across all component instances
  const [books, setBooks] = createSignal<Book[]>([]);
  // Track if books are loaded from storage
  const [isInitialized, setIsInitialized] = createSignal(false);

  onMount(() => {
    const stored = localStorage.getItem("books");
    if (stored) {
      try {
        setBooks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse books from localStorage", e);
      }
    }
    setIsInitialized(true);
  });

  createEffect(() => {
    // Only save to localStorage if we've already initialized (prevents wiping data on mount)
    if (isInitialized()) {
      localStorage.setItem("books", JSON.stringify(books()));
    }
  });

  const addBook = (book: Book) => {
    setBooks((prev) => [...prev, book]);
  };

  const updateBook = (id: number, updatedBook: Partial<Book>) => {
    setBooks((prev) => 
      prev.map((book) => 
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const deleteBook = (id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return { books, addBook, updateBook, deleteBook };
}