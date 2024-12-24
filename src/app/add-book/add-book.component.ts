import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { Book } from '../Book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
   
  book:Book ={
    bookName:'',
    authName:'',
    price:0,
    publishedYear:new Date(),
    bookAuthors: null,
  }
  constructor(private apiser:ApiserviceService,private router:Router)
      {
  
      }

   onAdd():void{
    console.log(this.book);
    this.apiser.addBook(this.book).subscribe(
      (response)=>{
        console.log('book added successfully',response);
      this.router.navigate(['/']);
      }
    );
   }
}
