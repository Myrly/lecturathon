import { Component, createSignal } from "solid-js";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "./ui/button";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { NumberField, NumberFieldDecrementTrigger, NumberFieldGroup, NumberFieldIncrementTrigger, NumberFieldInput, NumberFieldLabel } from "~/components/ui/number-field";
import { HiOutlineArrowUpTray, HiOutlineCheck, HiOutlineQuestionMarkCircle } from "solid-icons/hi";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { isMobile } from "~/lib/utils";
import { useBooks } from "~/lib/useBooks";
import { Book } from "~/types/book";
import { logac } from "~/lib/logger";

const AddBook: Component<{}> = () => {

  const { addBook } = useBooks();
  const [cover, setCover] = createSignal<string>("");
  const [isOpen, setIsOpen] = createSignal(false);
  let fileInput: HTMLInputElement | undefined;
  let formRef: HTMLFormElement | undefined;

  const getAuthorsPlaceholder = () => {
    let placeholderText: string = "Amy Santiago, ";
    if (isMobile()) {
      placeholderText += "Raymond Holt";
    } else {
      placeholderText += "Jake Peralta (il a écrit les vannes)";
    }
    return placeholderText;
  }

  const handleFileChange = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not a valid image");
      input.value = "";
      setCover("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setCover(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    if (formRef) {
      formRef.reset();
      setCover("");
    }
  };

  const submitForm = (closeAfterSubmit: boolean) => {
    if (!formRef) return;
    
    const data = new FormData(formRef);
    const title = (data.get("title") as string)?.trim();
    const authors = (data.get("authors") as string)?.split(",").map(a => a.trim()).filter(Boolean) || [];
    const genres = (data.get("genres") as string)?.split(",").map(g => g.trim()).filter(Boolean) || [];
    const tags = (data.get("tags") as string)?.split(",").map(t => t.trim()).filter(Boolean) || [];
    const startPage = parseInt(data.get("startPage") as string, 10) || 1;

    const newBook = new Book(
      Date.now(),
      title || "Sans titre",
      authors,
      genres,
      tags,
      "en",
      false,
      startPage,
      cover()
    );

    addBook(newBook);
    logac("add-book", {
      book: newBook.id,
    });
    resetForm();

    if (closeAfterSubmit) {
      setIsOpen(false);
    }
  };

  const handleTooltipClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogTrigger as={Button<"button">}>Ajouter un livre</DialogTrigger>
      <DialogContent class="max-w-[500px] w-[90%]">
        <form ref={formRef}>
        <DialogHeader>
          <DialogTitle>Nouveau livre</DialogTitle>
          <DialogDescription>
            Rentrez les détails du livre, puis ajoutez le. Les champs marqués d'un astérisque (*) sont obligatoires.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <TextField class="grid w-full items-center gap-1.5" required>
            <TextFieldLabel for="title">Titre*</TextFieldLabel>
            <TextFieldInput type="text" id="title" name="title" placeholder="Les Carnets de Nostradamus" />
          </TextField>
          <div class="grid gap-4 w-full items-center" classList={{ "grid-cols-2": isMobile(), "grid-cols-5": !isMobile() }}>
            <NumberField class="w-full grid items-start gap-1.5" classList={{ "col-span-2": !isMobile()}} required>
              <NumberFieldLabel for="startPage" class="flex items-center gap-0.5">
                Première page*
                <Tooltip>
                  <TooltipTrigger onClick={handleTooltipClick}><HiOutlineQuestionMarkCircle class="ml-1 text-muted-foreground" size={16} /></TooltipTrigger>
                  <TooltipContent class="text-wrap max-w-80">Le numéro de la première page de texte que vous <b>lirez</b> durant le marathon.</TooltipContent>
                </Tooltip>
              </NumberFieldLabel>
              <NumberFieldGroup>
                <NumberFieldInput id="startPage" name="startPage" placeholder="14" />
                <NumberFieldIncrementTrigger />
                <NumberFieldDecrementTrigger />
              </NumberFieldGroup>
            </NumberField>
            <TextField class="w-full grid items-end gap-1.5" classList={{ "col-span-3": !isMobile()}}>
              <TextFieldLabel>Couverture</TextFieldLabel>
              <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  hidden
                  ref={el => (fileInput = el)}
                  onChange={handleFileChange}
                />
              <Button type="button" variant="outline" class="w-full mt-1" onClick={() => fileInput?.click()}>
                {
                  cover() && cover() != "" ? 
                  <HiOutlineCheck class="mt-0.5" size={16} /> :
                  <HiOutlineArrowUpTray class="mt-0.5" size={16} />
                }
                {
                isMobile() 
                ? cover() && cover() != "" 
                  ? 'Chargée' 
                  : 'Choisir'
                : cover() && cover() != "" 
                  ? 'Image chargée' 
                  : 'Choisir une image'}
              </Button>
            </TextField>
          </div>
          <TextField class="grid w-full items-center gap-1.5">
            <TextFieldLabel for="authors">Auteur(s)</TextFieldLabel>
            <p id="authors-help" class="text-sm text-muted-foreground">Séparez les auteurs par une virgule</p>
            <TextFieldInput type="text" id="authors" name="authors" placeholder={getAuthorsPlaceholder()} aria-describedby="authors-help" />
          </TextField>
          <TextField class="grid w-full items-center gap-1.5">
            <TextFieldLabel for="genres">Genre(s)</TextFieldLabel>
            <p id="genres-help" class="text-sm text-muted-foreground">Séparez les genres par une virgule</p>
            <TextFieldInput type="text" id="genres" name="genres" placeholder="Fantasy, Horreur" aria-describedby="genres-help" />
          </TextField>
          <TextField class="grid w-full items-center gap-1.5">
            <TextFieldLabel for="tags">Tag(s)</TextFieldLabel>
            <p id="tags-help" class="text-sm text-muted-foreground">Séparez les tags par une virgule</p>
            <TextFieldInput type="text" id="tags" name="tags" placeholder="Lovers to enemies, confiture, emprunté, tranchefil" aria-describedby="tags-help" />
          </TextField>
        </div>
        <DialogFooter>
          <div class="w-full grid grid-cols-2 gap-2">
            <Button type="button" onClick={() => submitForm(true)} class="w-full">Ajouter et fermer</Button>
            <Button type="button" variant="outline" onClick={() => submitForm(false)} class="w-full">Ajouter et continuer</Button>
          </div>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;