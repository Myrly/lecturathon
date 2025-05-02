import { Component } from "solid-js";
import { ModeToggle } from "./reusables/mode-toggle";
import { ThemeSwitch } from "./reusables/theme-switch";
import Timer from "./reusables/timer";

const Navbar: Component<{}> = () => {

  return (
    <>
      <nav class="flex items-center justify-between">
        <div>
          <Timer endTime={new Date(2025, 4, 26, 17, 10, 0)} />
        </div>
        <div class="flex items-center justify-end">
          <ThemeSwitch />
          <ModeToggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;