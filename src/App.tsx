import { ColorModeProvider, ColorModeScript, createLocalStorageManager } from "@kobalte/core";
import './App.css';
import { Home } from './components/Home';
import Navbar from "./components/Navbar";
import { onMount } from "solid-js";

function App() {
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
          <Home />
      </ColorModeProvider>
    </>
  );
}

export default App;
