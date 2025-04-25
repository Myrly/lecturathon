import { Component  , createSignal, For, onMount, Show } from "solid-js";
import { useBooks } from "~/lib/useBooks";
import { Book } from "~/types/book";
import BookListCard from "./BookListCard";

const BookList: Component<{isOngoing: boolean}> = (props: {isOngoing: boolean}) => {
  const { books } = useBooks();
  const [maskClass, setMaskClass] = createSignal('scroll-mask-bottom');
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

  onMount(() => {
    if (scrollContainerRef) {
      scrollContainerRef.addEventListener('scroll', updateScrollMask);
      setTimeout(updateScrollMask, 0);
    }
    
    return () => {
      if (scrollContainerRef) {
        scrollContainerRef.removeEventListener('scroll', updateScrollMask);
      }
    };
  });
  
  return (
    <>
      <div ref={scrollContainerRef} class={`flex items-center justify-center flex-col w-full overflow-y-scroll scrollbar-hidden ${maskClass()}`}>
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