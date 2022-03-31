import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  hasApiError:boolean = false
  responseJson:string = null

  constructor(
    public auth: AuthService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        console.log('is authed')
      } else {
        console.log('is not authed')
      }
    })
  }

  orderPizza() {
    // this.api.order$().subscribe({
    //   next: (res) => {
    //     this.hasApiError = false;
    //     this.responseJson = JSON.stringify(res, null, 2).trim();
    //   },
    //   error: () => this.hasApiError = true,
    // });
  }
}
