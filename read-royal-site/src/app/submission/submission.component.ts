import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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







  constructor( private formBuilder: FormBuilder) { 
    this.someForm = this.formBuilder.group({
      fictionName: ['', Validators.required],
      description: ['', Validators.required],
      fictionCover: ['', Validators.required],
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
console.log(this.someForm.get("editor").value)
}

save(): void {
    const formData = new FormData();
    formData.append('myImageToSend', this.imageFile.file);
    formData.append('title', 'Set your title name here');
    formData.append('description', 'Set your title description here');

    //this.clientService.create(formData).subscribe(data => {});
}

}
