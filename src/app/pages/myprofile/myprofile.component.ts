import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Profile } from './profile-model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private globalService: GlobalService, private route: Router) { }
  profileForm: any;

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    password: '',
    mobile_number: '',
    job_title: ''
  }
  ngOnInit(): void {
    this.globalService.httpGetProfile();

    console.log('getToken', this.globalService.getToken());

    if (this.globalService.getToken() === null || this.globalService.getToken() == '') {
      this.route.navigate(['/']);
    }

    this.globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.fillForm(profile);
      }
    );

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      mobile_number: new FormControl('',[Validators.required]),
      job_title: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirm_password: new FormControl('',[Validators.required])
    });
  }

  fillForm(profile: any) {
    this.profileForm.patchValue({
      first_name: profile.meta.first_name,
      email: profile.email,
      last_name: profile.meta.last_name,
      alias: profile.alias,
      mobile_number: profile.meta.mobile_number,
      job_title: profile.meta.job_title
    });
  }

  onSubmit(): void {
    if(this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      }
      this.globalService.httpUpdateProfile(newFormValues);
    } else {
      alert('Invalid Form!');
    }
    console.log('form values',this.profileForm.value);
    console.log('form valid',this.profileForm.valid);
  }

  onLogout(): void {
    this.globalService.deleteToken();
  }

}
