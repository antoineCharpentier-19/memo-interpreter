import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  search$ = new Subject<string>();


constructor(
  private http: HttpClient,
) { }

getMemos() {
  return this.http.get('http://localhost:3000/');
}


}
