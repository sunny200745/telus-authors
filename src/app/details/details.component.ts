import { Author, AuthorWork } from './../services/Author';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  authorDetails: Author | null = {} as Author;
  workDetails: AuthorWork = {} as AuthorWork;
  active = 1;
  isListToggleActive:boolean = false;
  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    this.getDetails();
  }
  getDetails(){
    this.route.data.subscribe(v => {
      this.authorDetails = window.history.state.author;
    });


    this.authorService.getAuthorWorks().subscribe(workDetails => {
      this.workDetails = workDetails;
    })
  }


  toggleListView(): void{
    this.isListToggleActive = !this.isListToggleActive ;
  }
  backToSearch() {
    this.router.navigateByUrl('/home')
  }
}
