import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { AuthorService } from '../services/author.service';
import { Author } from '../services/Author';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {

  model: any;
  searching = false;
  searchFailed = false;
  constructor(private _authorService: AuthorService, private router:Router) { }

  @Output() selectedAuthorDetails = new EventEmitter();
  ngOnInit(): void {
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._authorService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
    formatter = (x: {name: string}) => x.name;

    selectedItem(item: NgbTypeaheadSelectItemEvent){
      this.selectedAuthorDetails.emit('close')
      this.router.navigateByUrl('/details', { state: {author: item.item}} );
    }

}
