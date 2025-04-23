import { For } from "solid-js";
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

class Theme {
  constructor(public value: string, public display: string) {}
}
 
export function ThemeSwitch() {

  const themes: Theme[] = [
    { value: "yellow", display: "Jaune" },
    { value: "red", display: "Rouge" },
    { value: "neutral", display: "Neutre" }
  ]
  
  const updateTheme = (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('color-theme', newTheme);
  }
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button<"button">} variant="ghost" size="sm" class="w-9 px-0">
        <div class="flex items-center justify-center w-6 h-6">
          <div class="w-4 h-4 rounded-sm bg-primary"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <For each={themes} fallback={<div>Loading...</div>} children={theme => (
          <DropdownMenuItem onSelect={() => updateTheme(theme.value)}>
            <div class="flex items-center justify-center w-4 h-4" data-theme={theme.value}>
              <div class="w-4 h-4 rounded-sm bg-primary"></div>
            </div>
            <span>{theme.display}</span>
          </DropdownMenuItem>
        )} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}