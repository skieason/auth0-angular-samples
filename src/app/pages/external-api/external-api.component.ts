import { Component, OnInit } from '@angular/core';
import { AuthClientConfig, AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/api.service';
import { concatMap, tap, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css'],
})
export class ExternalApiComponent implements OnInit {
  responseJson: string;
  metadata: {};
  orderResponseJson: string;
  audience = this.configFactory.get()?.audience;
  hasApiError = false;
  user: any = {};
  orderQuantity: number = 1;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private api: ApiService,
    private configFactory: AuthClientConfig
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      user.metadata = user['https://pizza42.com/user_metadata'] || {}
      this.user = user;
    })
  }

  pingApi() {
    this.api.ping$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.responseJson = JSON.stringify(res, null, 2).trim();
      },
      error: () => this.hasApiError = true,
    });
  }

  orderPizza() {
    const order = { type: 'pizza', quantity: this.orderQuantity, created: new Date() }
  
    this.api.order$(this.user.sub, order).subscribe({
      next: (orderRes) => {
        this.hasApiError = false;
        this.user.metadata.orders.unshift(orderRes);
    
        this.http.patch(
          encodeURI(`https://dev-49fsv0cc.us.auth0.com/api/v2/users/${this.user.sub}`), 
          { user_metadata: this.user.metadata }
        ).subscribe(response => {
          this.orderQuantity = 1;
        })
      },
      error: () => this.hasApiError = true,
    });
  }
}
