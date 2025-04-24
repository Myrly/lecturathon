import { Component, For } from "solid-js";
import { Book } from "~/types/book";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const BookListCard: Component<{book: Book}> = (props: {book: Book}) => {
  
  return (
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full h-20 my-2 flex items-center justify-between">
      
      {/* Book cover */}
      <div class="flex items-center">
        <img src={props.book.cover} alt={props.book.title} class="h-20 rounded-l-lg" />
      </div>

      {/* Book details, Title above authors badge and genre badges which are in the same list, read button next to them */}

      <div class="flex justify-start">
        <div class="flex flex-col">
          <h3 class="text-lg font-semibold">{props.book.title}</h3>
          <For each={props.book.authors || []}>
            {(item) => (
              <Badge size="xxs">{item}</Badge>
            )}
          </For>
        </div>
      </div>

      {/* Read button */}
      <div class="flex items-center pr-3">
        <Button size="sm">Read &gt;</Button>
      </div>

    </div>
  );
};

export default BookListCard;