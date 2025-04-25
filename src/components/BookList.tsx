import { Component  , For, Show } from "solid-js";
import { useBooks } from "~/lib/useBooks";
import { Book } from "~/types/book";
import BookListCard from "./BookListCard";

const BookList: Component<{isOngoing: boolean}> = (props: {isOngoing: boolean}) => {
  const { books } = useBooks();
  
  return (
    <>
      <div class="flex items-center justify-center flex-col h-100 w-full">
        <For each={books()}>
          {(book: Book) => (
            <Show when={book.finished !== props.isOngoing}>
              <BookListCard book={book} />
            </Show>
          )}
        </For>
      </div>
    </>
  );
};

export { BookList };