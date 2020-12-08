import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AvatarSwap } from '../models/AvatarSwap';
import { BioSwap } from '../models/bioSwap';
import { UpdateTokenView } from '../models/UpdateTokenView';
import { UsernameSwap } from '../models/usernameSwap';
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
  usernameForm: FormGroup;
  descriptionForm : FormGroup;
  returnUrl: string;
  error = '';
  usernameError = '';
  bioError = '';
  loading = false; 
	   submitted = false;
	   submittedBio = false;
  selectedFiles: FileList;
  
  currentFile: File;
  profileView : UpdateTokenView = new UpdateTokenView;
  
  constructor( private formBuilder: FormBuilder, private profileService : ProfileService, private authentication : AuthenticationService,
    private router: Router) {
		this.usernameForm = this.formBuilder.group({
			username: ['', Validators.compose( [Validators.required, Validators.pattern("^([A-Za-z0-9\-\_]+)")])]
		  });

		  this.descriptionForm = this.formBuilder.group({
			description: ['', [Validators.required]]
		  });
	 }

  ngOnInit(): void {
	  this.profileService.getProfile().subscribe(data => {
this.profileView.username = data.username;
this.profileView.description = data.description;
this.profileView.image64 = data.image64;
this.profileView.email = data.email;
this.readImage(data.image64);
this.g.description.setValue(data.description);
this.f.username.setValue(data.username);
console.log(this.profileView);
});
}
  get f() { return this.usernameForm.controls; }
  get g() { return this.descriptionForm.controls; }

  onDescriptionUpload(){
	this.submittedBio = true;
	
	
	if (this.descriptionForm.invalid) {
		this.bioError = "Description cant be empty";
		return;
	}
	console.log(this.g.description.value);
	var swap = new BioSwap();
	swap.jwt = this.authentication.userValue.token;
	swap.description = this.g.description.value;

	this.profileService.saveBio(swap).subscribe(data => {
		
		this.bioError = 'Succesfully updated description'
			},
			err => {
			this.bioError = err;	
			})
	
  }

  onUsernameUpload(){
	  this.submitted = true;
	  this.usernameError = '';

	  if (this.usernameForm.invalid) {
		return;
	}
	var swap = new UsernameSwap();
	swap.jwt = this.authentication.userValue.token;
	swap.username = this.f.username.value;

	this.profileService.saveUsername(swap).subscribe(data => {
		this.authentication.createJWT(data);
this.usernameError = 'Succesfully updated username'
	},
	err => {
		console.log(err);
	this.usernameError = err;	
	})

  }

  FileUpload(event){

	var reader = new FileReader();
	var swap = new AvatarSwap();

	this.currentFile = event.files[0];
	reader.readAsDataURL(event.files[0]);
	reader.onload = (_event) => {
		console.log("WAAAAAAAH");
		this.url = reader.result;
	
		swap.avatarImage = reader.result.toString();
		swap.jwtToken = this.authentication.userValue.token;
	
		this.profileService.saveAvatarImage(swap).subscribe(
			data => {
			  this.error = data;
			},
			err => {
			
			 // this.error = 'Could not upload the file!';
			  this.currentFile = undefined;
			});
		  this.selectedFiles = undefined;
	}

	
}


//     uploadImage(){
// 		var reader = new FileReader();
// 		this.currentFile = this.selectedFiles.item(0);
// 		reader.readAsDataURL(this.selectedFiles.item(0));
// 	console.log(reader.result);
// 	var swap = new AvatarSwap();
	
	
// 	console.log(reader.result.toString());
// 	swap.avatarImage = reader.result.toString();
// 	swap.jwtToken = this.authentication.userValue.token;
// 	console.log(swap);
//   this.profileService.saveAvatarImage(swap).subscribe(
//     data => {
//       this.error = data;
//     },
//     err => {
//       this.error = 'Could not upload the file!';
//       this.currentFile = undefined;
//     });
//   this.selectedFiles = undefined;
// }

readImage(url : string){
this.url =  url;	

}

//   selectFile(event) {
	  
// 		if(!event.target.files[0] || event.target.files[0].length == 0) {
// 			this.msg = 'You must select an image';
// 			return;
// 		}

// 		console.log(event.target.files[0]);
		
// 		var mimeType = event.target.files[0].type;
		
// 		if (mimeType.match(/image\/*/) == null) {
// 			this.msg = "Only images are supported";
// 			return;
// 		}
// 		var size = event.target.files[0].size
// 		var reader = new FileReader();
// 		reader.readAsDataURL(event.target.files[0]);
		
// 		reader.onload = (_event) => {
// 			this.msg = "";
// 			this.selectedFiles = event.target.files;
// 			this.url = reader.result; 
// 			console.log(this.url);
// 		}
// 	}

}
