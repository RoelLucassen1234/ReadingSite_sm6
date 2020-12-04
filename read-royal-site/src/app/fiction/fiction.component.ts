import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChapter } from '../models/BaseChapter';
import { FictionInfo } from '../models/FictionInfo';
import { StoriesService } from '../services/stories-service.service';

@Component({
  selector: 'app-fiction',
  templateUrl: './fiction.component.html',
  styleUrls: ['./fiction.component.css']
})
export class FictionComponent implements OnInit {
 fiction : FictionInfo;
 chapters: BaseChapter[];
 id : String;
  constructor(private route: ActivatedRoute, private storyService : StoriesService) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
     this.id = params.id;
      this.getFiction(this.id);
     })
   
  }

  getFiction(id : String){
    this.storyService.getFiction(id).subscribe(data => {
    this.fiction = data;
    this.chapters = this.fiction.chapters;
      console.log(this.fiction);
         }, err => {
           console.log(err);
         })
  }

}
