import { Component, EventEmitter, Output } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Book } from '../Book';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,NavbarComponent,RouterModule,FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {

    books:Book[]=[];
    isAdmin: boolean = false;
    isUser: boolean = false;
    filteredBooks: Book[] = [];
  filterPrice: number | null = null;
  filterAuthorName: string = '';
    
    constructor(private apiser:ApiserviceService,
      private authService:AuthService,
      private cartService: CartService,
      private router:Router,private route:ActivatedRoute)
    {

    }

   ngOnInit():void{
      this.apiser.get().subscribe((response)=>
        {this.books = response,
     console.log(response)});
      console.log('ngOnInit called')
      this.loadBooks();
      this.isAdmin = this.authService.isAdmin();
      this.isUser = this.authService.isUser();
    }
   
    addToCart(book: Book): void {
      console.log('Book added:', book);
      this.cartService.addToCart(book) // Emit the book object
      this.router.navigate(['/cart']);
    }
   loadBooks():void{
      this.apiser.get().subscribe((response)=>
        {
          this.books = response || [],
          this.filteredBooks = [...this.books]
      });   
      
   }
   applyFilters(): void {
    this.filteredBooks = this.books.filter((book) => {
      const matchesPrice =
        this.filterPrice === null || book.price <= this.filterPrice;
      const matchesAuthorName =
        this.filterAuthorName === '' ||
        book.authName
          .toLowerCase()
          .includes(this.filterAuthorName.toLowerCase());
      return matchesPrice && matchesAuthorName;
    });
 
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
   deletebok(id:number): void {
    if (confirm('Are you sure you want to delete this company?')) {
    // const id=Number(this.route.snapshot.paramMap.get('id'));
     this.router.navigate(['/delete',id]);
    }
  }
}
