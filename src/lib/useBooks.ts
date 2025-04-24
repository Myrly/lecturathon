import { createSignal, createEffect, onMount } from "solid-js";
import { Book } from "~/types/book";

export function useBooks() {
  const [books, setBooks] = createSignal<Book[]>([]);

  onMount(() => {
    const stored = localStorage.getItem("books");
    if (stored) {
      try {
        setBooks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse books from localStorage", e);
      }
    }
  });

  createEffect(() => {
    localStorage.setItem("books", JSON.stringify(books()));
  });

  const addBook = (book: Book) => {
    setBooks([...books(), book]);
  };

  return { books, addBook };
}