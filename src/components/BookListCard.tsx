import { Component, For } from "solid-js";
import { Book } from "~/types/book";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const BookListCard: Component<{book: Book}> = (props: {book: Book}) => {
  
  return (
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full h-20 my-2 flex items-center justify-between">
      
      <div class="flex items-center justify-start gap-2 overflow-hidden">
        {/* Book cover */}
        <div class="flex items-center">
          <img src={props.book.cover} alt={props.book.title} class="h-20 rounded-l-lg" />
        </div>

        {/* Book details, Title above authors badge and genre badges which are in the same list, read button next to them */}

        <div class="flex justify-start">
          <div class="flex flex-col">
            <h3 class="text-base font-semibold">{props.book.title}</h3>
            <div class="flex gap-2 mt-1 overflow-hidden">
              <For each={props.book.authors || []}>
                {(item) => (
                  <p class="text-xs bg-secondary text-secondary-foreground/75 border px-0.5 py0.25 rounded-md">{item}</p>
                )}
              </For>
            </div>
            <div class="flex gap-2 mt-1 overflow-scroll">
              <For each={props.book.genres || []}>
                {(item) => (
                  <p class="text-xs text-muted-foreground border px-0.5 py0.25 rounded-md">{item}</p>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* Read button */}
      <div class="flex items-center justify-end pr-3 col-span-1">
        <Button size="sm">Lire</Button>
      </div>

    </div>
  );
};

export default BookListCard;