export interface Book{
    bookId?:number;
    bookName:string;
    authName:string;
    price:number;
    publishedYear:Date;
    bookAuthors?:null;
}