import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, of, Observable, Subject } from 'rxjs';
import { Author, AuthorWork } from './Author';


const AUTHORS_URL = 'https://openlibrary.org/search/authors.json';
const WORK_URL = "https://openlibrary.org/authors/OL1394244A/works.json?limit=5&amp;offset=1";
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {}
  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(AUTHORS_URL, {params: {'q': term}}).pipe(
        map(response =>
          {
            return (response as any).docs
          })
      );
  }

  getAuthorWorks(): Observable<any>{
    return this.http.get(WORK_URL);
  }
}
