import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged: any;
  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged
      }
    );
    //console.log('old value:', this.logins)
    this.globalService.checkLogStatus();
  }

}
