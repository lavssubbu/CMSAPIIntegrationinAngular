import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {path:'books',component:BookListComponent},
    {path:'book/:id',component:BookDetailComponent},
    {path:'addbook',component:AddBookComponent},
    {path:'updatebook/:id',component:UpdateBookComponent},
    {path:'delete/:id',component:DeleteBookComponent},
    {path:'login',component:LoginComponent},
    {path:'cart',component:CartComponent},
    { path: '', redirectTo: '/books', pathMatch: 'full' }

];
