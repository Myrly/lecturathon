import { Component, For } from "solid-js";
import { Book } from "~/types/book";
import { Button } from "./ui/button";
import { A } from "@solidjs/router";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const BookListCard: Component<{book: Book}> = (props: {book: Book}) => {
  
  return (
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full h-20 my-2 flex items-center">
      {/* Book cover with fixed width */}
      <div class="flex-shrink-0">
        <img src={props.book.cover} alt={props.book.title} class="h-20 w-14 object-cover rounded-l-lg" />
      </div>
      
      {/* Book details with flex-grow */}
      <div class="flex-grow overflow-hidden px-2 mt-2">
        <div class="flex flex-col justify-end max-w-full">
          <Tooltip>
            <TooltipTrigger>
              <h3 class="text-[0.9em] text-start font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                {props.book.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>{props.book.title}</TooltipContent>
          </Tooltip>
          
          
          {/* Authors badges with horizontal scroll */}
          <div class="flex max-w-full relative">
            <div class="flex gap-1 mt-0.5 overflow-x-auto scrollbar-hidden pb-1 max-w-full">
              <For each={props.book.authors || []}>
                {(item) => (
                  <p class="text-[10px] bg-secondary text-secondary-foreground/75 border px-0.5 rounded-md whitespace-nowrap">{item}</p>
                )}
              </For>
            </div>
          </div>
          
          {/* Genres badges with horizontal scroll */}
          <div class="flex max-w-full relative">
            <div class="flex gap-1 overflow-x-auto scrollbar-hidden pb-1 max-w-full">
              <For each={props.book.genres || []}>
                {(item) => (
                  <p class="text-[10px] text-muted-foreground border px-0.5 py-0.25 rounded-md whitespace-nowrap">{item}</p>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
      
      {/* Read button with fixed width */}
      <div class="flex-shrink-0 pr-3">
        <Button as={A} href={`/read/${props.book.id}`} size="sm">Lire</Button>
      </div>
    </div>
  );
};

export default BookListCard;