import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core";
import './App.css';
import Navbar from "./components/Navbar";
import { onMount } from "solid-js";

const App = (props: any) => {
  const storageManager = createLocalStorageManager("vite-ui-theme");

  onMount(() => {

    const colorTheme = localStorage.getItem("color-theme") || "yellow";
    document.documentElement.setAttribute("data-theme", colorTheme);
    
  });

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
        <ColorModeProvider storageManager={storageManager}>
          <div class="fixed top-0 w-screen"><Navbar/></div>
          {props.children}
      </ColorModeProvider>
    </>
  );
}

export default App;
