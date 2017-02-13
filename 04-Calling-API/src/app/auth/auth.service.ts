import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from './auth0-variables';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    oidcConformant: true,
    autoclose: true,
    auth: {
      audience: AUTH_CONFIG.apiUrl,
      redirectUri: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      params: {
        scope: 'openid'
      }
    }
  });

  userProfile: any;

  constructor(private router: Router) {}

  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (authResult && authResult.error) {
        alert(`Error: ${authResult.error}`);
      }
    });
  }

  public login(): void {
    this.lock.show();
  }

  public getProfile(cb): void {
    let accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw 'Access token must exist to fetch profile';
    }

    let self = this;
    this.lock.getUserInfo(accessToken, function(err, profile) {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the id_token is expired or not
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/home']);
  }

  private setSession(authResult): void {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
