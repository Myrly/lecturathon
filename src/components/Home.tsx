import { Component } from "solid-js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { BookList } from "./BookList";
import AddBook from "./AddBook";

const Home: Component<{}> = () => {
  
  return (
    <>
      <div class="flex items-center justify-center h-100 w-screen">
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
              <TabsContent value="ongoing" class="flex justify-center items-center"><BookList isOngoing={true} /></TabsContent>
              <TabsContent value="finished" class="flex justify-center items-center"><BookList isOngoing={false} /></TabsContent>
            </Tabs>
            <AddBook/>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export { Home };