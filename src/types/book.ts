export class Book {
  constructor(
    public id: number,
    public title: string,
    public authors: string[],
    public genres: string[],
    public tags: string[],
    public language: string,
    public finished: boolean,
    public startPage: number,
    public latestPage: number,
    public negapages: number,
    public cover: string,
  ) {}
}