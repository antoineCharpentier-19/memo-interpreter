import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

constructor(
  private http: HttpClient,
) { }

getMemos() {
  return this.http.get('http://localhost:3000/');
}


}
