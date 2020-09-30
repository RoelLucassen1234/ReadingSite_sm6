import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from '../login';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { By } from '@angular/platform-browser';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
         ]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],

      declarations: [
         RegisterComponent , LoginComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicking button should go to another page', async(inject([Router, Location], (router: Router, location: Location) => {
  
    const button = fixture.debugElement.query(By.css(".btn-primary")).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('');
  });
})));

});
