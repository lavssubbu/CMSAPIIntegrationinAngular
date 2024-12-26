import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [],
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.css'
})
export class DeleteBookComponent {
  constructor(private apiser:ApiserviceService,private router:Router,private route:ActivatedRoute)
  {

  }
  ngOnInit():void{
    const id = +this.route.snapshot.params['id'];
       this.apiser.deletebook(id).subscribe(
        (response)=>
        {
          console.log("Book Removed");
          this.router.navigate(['/'])
        }
       )
  }
}
