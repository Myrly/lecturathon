import { Component, createSignal, For, onMount, onCleanup, createEffect } from "solid-js";
import { useBooks } from "~/lib/useBooks";
import { Book } from "~/types/book";
import BookListCard from "./BookListCard";

const BookList: Component<{showOngoing: boolean}> = (props: {showOngoing: boolean}) => {
  const { books } = useBooks();
  const [maskClass, setMaskClass] = createSignal('scroll-mask-bottom');
  const [filteredBooks, setFilteredBooks] = createSignal<Book[]>([]);
  let scrollContainerRef: HTMLDivElement | undefined;
  
  const updateScrollMask = () => {
    if (!scrollContainerRef) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef;
    const isAtTop = scrollTop <= 1;
    const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1;
    
    if (isAtTop && isAtBottom) {
      setMaskClass('scroll-mask-none');
    } else if (isAtTop) {
      setMaskClass('scroll-mask-bottom');
    } else if (isAtBottom) {
      setMaskClass('scroll-mask-top');
    } else {
      setMaskClass('scroll-mask-both');
    }
  };

  // Update filtered books whenever the source books change
  createEffect(() => {
    const allBooks = books();
    setFilteredBooks(allBooks.filter(book => book.finished !== props.showOngoing));
    
    // Also update the scroll mask when books change
    setTimeout(updateScrollMask, 0);
  });

  onMount(() => {
    if (scrollContainerRef) {
      scrollContainerRef.addEventListener('scroll', updateScrollMask);
      setTimeout(updateScrollMask, 0);
    }
  });
  
  onCleanup(() => {
    if (scrollContainerRef) {
      scrollContainerRef.removeEventListener('scroll', updateScrollMask);
    }
  });
  
  return (
    <>
      <div ref={scrollContainerRef} class={`w-full max-h-[45vh] overflow-y-scroll scrollbar-hidden ${maskClass()}`}>
        <For each={filteredBooks()}>
          {(book: Book) => <BookListCard book={book} />}
        </For>
      </div>
    </>
  );
};

export { BookList };