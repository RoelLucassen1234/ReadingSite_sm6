import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { StoriesService } from '../services/stories-service.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  imageFile: {link: string, file: any, name: string};
  someForm: FormGroup;
  currentFile: File;
  url;
  submitted : Boolean = false;
  minChapterContent : Boolean = false;
  submittedImage = false;
  
  editorStyle = {
    height: '140px'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['code-block'], ['link'], ['image'],
      [{'header': [1,2,3,4,5]}], [{'list': 'ordered'}, {'list' : 'bullet'}] ,
      [{'font': []}], [{'align': []}],
      ['clean']
    ]
  }

  get f() { return this.someForm.controls; }





  constructor(private fictionService : StoriesService,private authentication : AuthenticationService, private formBuilder: FormBuilder) { 
    this.someForm = this.formBuilder.group({
      fictionName: ['', Validators.required],
      description: ['', Validators.required],
      chapterName: ['',   Validators.required],
      editor: ['', Validators.required]

    })
  }

  ngOnInit(): void {

  }

  imagesPreview(event) {

    const reader = new FileReader();
    
	this.currentFile = event.files[0];
	reader.readAsDataURL(event.files[0]);
	reader.onload = (_event) => {
		console.log("WAAAAAAAH");
		this.url = reader.result;
  
  }
   
    
}

submitFunc(){

this.submitted = true;

if (this.someForm.invalid) {
  return;
}


const formData = new FormData();
formData.append('fictionImage', this.url);
formData.append('fictionTitle', this.someForm.get("fictionName").value);
formData.append('fictionDescription', this.someForm.get("description").value);
formData.append('chapterTitle', this.someForm.get("chapterName").value);
formData.append('chapterContent', this.someForm.get("editor").value);
formData.append('jwt', this.authentication.userValue.token);

this.fictionService.createFiction(formData).subscribe(data =>
  {
    // GO TO Fiction. make a page
  }, err =>
  {
    console.log(err);
  }

  )



}


maxLength(event){
if(event.editor.getLength() > 10000){
event.editor.deleteText(10000, event.editor.getLength())
}
else if (event.editor.getLength() < 10) {
  this.minChapterContent = true;
}else{
  this.minChapterContent = false; 
}
}

quillValidation(){

}

save(): void {
    const formData = new FormData();
    formData.append('myImageToSend', this.imageFile.file);
    formData.append('title', 'Set your title name here');
    formData.append('description', 'Set your title description here');

    //this.clientService.create(formData).subscribe(data => {});
}

}
