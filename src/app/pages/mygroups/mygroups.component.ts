import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-mygroups',
  templateUrl: './mygroups.component.html',
  styleUrls: ['./mygroups.component.css']
})
export class MygroupsComponent implements OnInit {
  groups: any;
  clients: any;
  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    console.log('test');
    this.globalService.httpGetProfile();
    this.globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile tss', profile.tag.groups);
        this.groups = profile.tag.groups;
        this.clients = profile.tag.accounts;
        console.log('this group', this.groups)
        console.log('this group', this.clients)
        // this.fillForm(profile);
      }
    );
  }

  onClick(): void {
    console.log('this group', this.groups)
    console.log('this group', this.clients)
  }

}
