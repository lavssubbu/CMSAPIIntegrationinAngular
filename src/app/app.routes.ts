import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';

export const routes: Routes = [
    {path:'',component:BookListComponent},
    {path:'book/:id',component:BookDetailComponent},
    {path:'addbook',component:AddBookComponent},
    {path:'updatebook/:id',component:UpdateBookComponent}

];
