import { Component } from "solid-js";
import { ModeToggle } from "./reusables/mode-toggle";
import { ThemeSwitch } from "./reusables/theme-switch";

const Navbar: Component<{}> = () => {

  return (
    <>
      <nav class="flex items-center justify-end">
        <ThemeSwitch />
        <ModeToggle />
      </nav>
    </>
  );
};

export default Navbar;