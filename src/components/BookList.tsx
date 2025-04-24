import { Component, createSignal, Show } from "solid-js";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const BookList: Component<{isOngoing: boolean}> = (props: {isOngoing: boolean}) => {
  const [count, setCount] = createSignal(0);

  const increment = () => setCount((prev) => prev + 1);
  
  return (
    <>
      <div class="flex items-center justify-center h-100 w-screen">
        <Card>
          <CardHeader/>
          <CardContent>
            <div class="flex items-center justify-between mb-4 gap-3">
              <p class="text-base">Button clicked {count()} times</p>
              <Button onClick={increment}>Click Me</Button>
            </div>
            <Show when={props.isOngoing}>
              <p class="text-base">Ongoing</p>
            </Show>
            <Show when={!props.isOngoing}>
              <p class="text-base">Finished</p>
            </Show>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export { BookList };