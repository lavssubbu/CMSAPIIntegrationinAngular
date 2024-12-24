import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {
      
      book:Book ={
        bookId:0,
        bookName:'',
        authName:'',
        price:0,
        publishedYear:new Date(),
        bookAuthors: null,
      }
      constructor(private apiser:ApiserviceService,private router:Router,private route:ActivatedRoute){}
    
      ngOnInit():void{
        const id= Number(this.route.snapshot.paramMap.get('id'));
        this.apiser.getBookbyId(id).subscribe((response)=>
          {this.book = response,
       console.log(response)});
      }
      onUpdate(): void {
        const id = this.book.bookId!;
        this.apiser.updatebook(id,this.book).subscribe(
          (response) => {
            console.log('Book updated successfully!', response);
            this.router.navigate(['/']); 
          },
          (error) => console.error('Error updating book', error)
        );
      }
}
