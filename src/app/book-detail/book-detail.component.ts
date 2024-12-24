import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../Book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {
   
  book?:Book
  constructor(private apiser:ApiserviceService,private router:Router,private route:ActivatedRoute){}

  ngOnInit():void{
    const id= +this.route.snapshot.params['id'];
    this.apiser.getBookbyId(id).subscribe((response)=>
      {this.book = response,
   console.log(response)});
  }
}
