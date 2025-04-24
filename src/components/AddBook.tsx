import { Component } from "solid-js";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Button } from "./ui/button";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { NumberField, NumberFieldDecrementTrigger, NumberFieldGroup, NumberFieldIncrementTrigger, NumberFieldInput, NumberFieldLabel } from "~/components/ui/number-field";
import { HiOutlineQuestionMarkCircle } from "solid-icons/hi";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"

const AddBook: Component<{}> = () => {


  return (
    <Dialog>
      <DialogTrigger as={Button<"button">}>Ajouter un livre</DialogTrigger>
      <DialogContent class="max-w-[500px] w-[90%]">
        <DialogHeader>
          <DialogTitle>Nouveau livre</DialogTitle>
          <DialogDescription>
            Rentrez les détails du livre, puis ajoutez le. Les champs marqués d'un astérisque (*) sont obligatoires.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <TextField class="grid w-full max-w-sm items-center gap-1.5" required>
            <TextFieldLabel for="title">Titre*</TextFieldLabel>
            <TextFieldInput type="text" id="title" placeholder="Les Carnets de Nostradamus" />
          </TextField>
          <TextField class="grid w-full max-w-sm items-center gap-1.5">
            <TextFieldLabel for="authors">Auteur(s)</TextFieldLabel>
            <p id="authors-help" class="text-sm text-muted-foreground">Séparez les auteurs par une virgule</p>
            <TextFieldInput type="text" id="authors" placeholder="Jake Peralta, Amy Santiago" aria-describedby="authors-help" />
          </TextField>
          <TextField class="grid w-full max-w-sm items-center gap-1.5">
            <TextFieldLabel for="genres">Genre(s)</TextFieldLabel>
            <p id="genres-help" class="text-sm text-muted-foreground">Séparez les genres par une virgule</p>
            <TextFieldInput type="text" id="genres" placeholder="Fantasy, Horreur" aria-describedby="genres-help" />
          </TextField>
          <TextField class="grid w-full max-w-sm items-center gap-1.5">
            <TextFieldLabel for="tags">Tag(s)</TextFieldLabel>
            <p id="tags-help" class="text-sm text-muted-foreground">Séparez les tags par une virgule</p>
            <TextFieldInput type="text" id="tags" placeholder="Lovers to enemies, confiture, emprunté, tranchefil" aria-describedby="tags-help" />
          </TextField>
          <div class="grid grid-cols-2 gap-4 w-full items-center">
            <NumberField class="w-full grid items-start gap-1.5" required>
              <NumberFieldLabel for="startPage" class="flex items-center gap-0.5">
                Première page*
                <Tooltip>
                  <TooltipTrigger><HiOutlineQuestionMarkCircle class="ml-1 text-muted-foreground" size={16} /></TooltipTrigger>
                  <TooltipContent>Le numéro de la première page de texte que vous lirez.</TooltipContent>
                </Tooltip>
              </NumberFieldLabel>
              <NumberFieldGroup>
                <NumberFieldInput id="startPage" placeholder="14" />
                <NumberFieldIncrementTrigger />
                <NumberFieldDecrementTrigger />
              </NumberFieldGroup>
            </NumberField>
            <TextField class="w-full grid items-end gap-1.5">
              <TextFieldLabel>Couverture</TextFieldLabel>
              <Button variant="outline" class="w-full">Choisir une image</Button>
            </TextField>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Ajouter le livre</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;