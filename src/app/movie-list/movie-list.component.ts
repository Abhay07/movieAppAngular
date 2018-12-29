import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieListComponent implements OnInit {
  movies: Array<{Title: string, Poster: string, Year: number}>;
  titleOrder: String;
  yearOrder: String;

  constructor() {
    this.movies = [];
    this.titleOrder = 'asc';
    this.yearOrder = 'asc';
  }

  ngOnInit(){

  }

  sort(para){
      const movies = this.movies;
      let titleOrder = this.titleOrder;
      let yearOrder =  this.yearOrder;
      if(para == 'name'){
        movies.sort((a,b)=>{
          if(titleOrder == 'asc'){
            return a.Title.charCodeAt(0) - b.Title.charCodeAt(0)
          }

          return b.Title.charCodeAt(0) - a.Title.charCodeAt(0)
        })
        titleOrder = titleOrder == 'asc' ? 'dsc' : 'asc';
      }
      else{
        movies.sort((a,b)=>{
          if(yearOrder == 'asc'){
            return a.Year - b.Year
          }

          return b.Year - a.Year;
        })
        yearOrder = yearOrder == 'asc' ? 'dsc' : 'asc';
      }


      this.movies = movies;
      this.titleOrder = titleOrder;
      this.yearOrder = yearOrder;
  }

  ngAfterViewInit() {
      fetch("http://www.omdbapi.com/?apikey=a567cf6c&s=love&type=movie")
      .then(res => res.json())
      .then((res)=>{
        this.movies = res.Search;
      })
      .catch()
  }

}
