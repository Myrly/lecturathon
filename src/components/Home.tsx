import { Component } from "solid-js";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { BookList } from "./BookList";
import AddBook from "./AddBook";
import { Button } from "./ui/button";
import { A } from "@solidjs/router";

const Home: Component<{}> = () => {
  
  return (
    <>
      <div class="flex items-center justify-around flex-col gap-5 h-100 w-screen">
        <Card class="max-w-[400px] w-[90%]">
          <CardHeader>
            <CardTitle>Vos livres</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ongoing">
              <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="ongoing">En cours</TabsTrigger>
                <TabsTrigger value="finished">Terminés</TabsTrigger>
              </TabsList>
              <TabsContent value="ongoing" class="flex justify-center items-center"><BookList showOngoing={true} /></TabsContent>
              <TabsContent value="finished" class="flex justify-center items-center"><BookList showOngoing={false} /></TabsContent>
            </Tabs>            
          </CardContent>
          <CardFooter class="flex justify-center items-center">
            <AddBook />
          </CardFooter>
        </Card>
        <Card class="max-w-[400px] w-[90%] max-h-[20vh]">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent class="flex justify-between items-center">
            <p class="text-lg text-success-foreground">190 pages lues</p>
            <Button as={A} href="/stats">Détails</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export { Home };