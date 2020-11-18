import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvatarSwap } from '../models/AvatarSwap';
import { UpdateTokenView } from '../models/AvatarSwap copy';
import { AuthenticationService } from '../services/authentication.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	url;
  msg = "";
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  loading = false; 
  submitted = false;
  selectedFiles: FileList;
  
  currentFile: File;
  profileView : UpdateTokenView = new UpdateTokenView;
  
  constructor( private formBuilder: FormBuilder, private profileService : ProfileService, private authentication : AuthenticationService,
    private router: Router) {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			bio: ['',   Validators.required],
			file: ['', Validators.required]
	  
		  })
	 }

  ngOnInit(): void {
	  this.profileService.getProfile().subscribe(data => {
this.profileView.username = data.username;
this.profileView.description = data.description;
this.profileView.image64 = data.image64;
this.profileView.email = data.email;
this.readImage(data.image64);
console.log(this.profileView);
});
}
  get f() { return this.loginForm.controls; }

    uploadImage(){
		var reader = new FileReader();
		this.currentFile = this.selectedFiles.item(0);
		reader.readAsDataURL(this.selectedFiles.item(0));
	console.log(reader.result);
	var swap = new AvatarSwap();
	
	swap.avatarImage = this.url;
	swap.jwtToken = this.authentication.userValue.token;
	console.log(reader.result.toString());
  this.profileService.saveAvatarImage(swap).subscribe(
    data => {
      this.error = data;
    },
    err => {
    
      this.error = 'Could not upload the file!';
      this.currentFile = undefined;
    });
  this.selectedFiles = undefined;
}

readImage(url : string){
this.url = "data:image/png;base64," + url;	

}

  selectFile(event) {
	  console.log("LOOK")
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.selectedFiles = event.target.files;
			this.url = reader.result; 
			console.log(this.url);
		}
	}

}
