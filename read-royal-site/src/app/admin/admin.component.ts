import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { AuthenticationService } from '../services/authentication.service';



@Component({
    selector: 'app-home-screen',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
  })
export class AdminComponent implements OnInit {
    loading = false;
   @Input() users: User[] = [];
   filtersLoaded: Promise<boolean>;
    error = '';

    constructor(private adminService:  AdminService, private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.filtersLoaded = Promise.resolve(false);
        this.refresh();
       
    }

refresh(){
    this.loading = true;

    this.adminService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
        this.filtersLoaded = Promise.resolve(true);      
    });
}
deleteRow(id){
    for(let i = 0; i < this.users.length; ++i){
        if (this.users[i].id === id) {
            this.users.splice(i,1);
        }
    }
}

    deleteUser(id : string){
        console.log(id);
        this.adminService.deleteUser(id).pipe(first())
        .subscribe({
            next: () => {
                // get return url from query parameters or default to home page
            },
            error: error => {
                this.error = error;   
                this.loading = false;
            }
        });
     this.deleteRow(id);
    }
      
        

}