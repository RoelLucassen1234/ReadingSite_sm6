import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from '../models/Chapter';
import { ChapterService } from '../services/chapter.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
content : string = "";
chapter : Chapter;
id : string;
  constructor(private chapterService : ChapterService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
       this.getChapter(params.id);
      })

  }

  getChapter(id : string){
    this.chapterService.getChapter(id).subscribe(data => {
      this.chapter = data;
      console.log(data);
      }, err => {
        console.log(err);
      })
  }

}
