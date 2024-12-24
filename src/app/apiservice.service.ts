import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
 private apiurl= "https://localhost:7225/api/Books"
  
 constructor(private http:HttpClient) { }
 
 get():Observable<any>
 {
  return this.http.get(this.apiurl);
 }

 getBookbyId(id:number):Observable<Book>
 {
   return this.http.get<Book>(`${this.apiurl}/${id}`)
 }
 addBook(book:Book):Observable<void>
 {
   return this.http.post<void>(this.apiurl,book)
 }
  updatebook(id:number,book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiurl}/${id}`,book);
  }
  deletebook(id:number):Observable<any>
  {
    return this.http.delete<any>(`${this.apiurl}/${id}`)
  }

}
