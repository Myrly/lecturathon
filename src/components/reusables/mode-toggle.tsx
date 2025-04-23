import { useColorMode } from "@kobalte/core"
 
import { HiOutlineSun, HiOutlineMoon, HiOutlineComputerDesktop, HiOutlineDevicePhoneMobile } from 'solid-icons/hi'
import { Show } from "solid-js";
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { isMobile } from "~/lib/utils";
 
export function ModeToggle() {
  const { setColorMode } = useColorMode();
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button<"button">} variant="ghost" size="sm" class="w-9 px-0">
        <HiOutlineSun class="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <HiOutlineMoon class="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setColorMode("light")}>
          <HiOutlineSun class="mr-2 size-4" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("dark")}>
          <HiOutlineMoon class="mr-2 size-4" />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setColorMode("system")}>
          <Show when={isMobile()} fallback={<HiOutlineComputerDesktop class="mr-2 size-4" />}>
            <HiOutlineDevicePhoneMobile class="mr-2 size-4" />
          </Show>
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}