import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Book } from '../Book';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

    books:Book[]=[];
    constructor(private apiser:ApiserviceService,private router:Router)
    {

    }

   ngOnInit():void{
      this.apiser.get().subscribe((response)=>
        {this.books = response,
     console.log(response)});
      console.log('ngOnInit called')
      this.loadBooks();
    }

   loadBooks():void{
      this.apiser.get().subscribe((response)=>this.books = response)
      
   }

   BookDetails(id:number):void{
      this.router.navigate(['/book',id]);
   }

   AddBook():void{
    this.router.navigate(['/addbook']);
   }
   updateBook(id:number):void{
    this.router.navigate(['/updatebook',id]);
   }
}
