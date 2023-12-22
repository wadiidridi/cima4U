// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  requestToken: string = '';

  constructor(
    private authService: AuthService,
    private roote: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {

      // Step 1: Get a request token
      this.authService.getRequestToken().subscribe((requestTokenData) => {
        const requestToken = requestTokenData.request_token;
 
        // Step 2: Login with shared credentials using the request token
        this.authService.validateWithLogin(requestToken, this.username, this.password).subscribe(
          (loginData) => {
            console.log(loginData);
            sessionStorage.setItem('loginData', JSON.stringify(loginData))
            this.authService.createSession(requestToken).subscribe(
              (sessionData) => {
                // Session created, you can now store the session ID or perform further actions
                sessionStorage.setItem('sessionData',JSON.stringify(sessionData) )
 
                console.log('Session created:', sessionData);
                this.authService.getAccountDetails(sessionData.session_id).subscribe(
                  (res)=>{
                    console.log(res);
                    sessionStorage.setItem('account',JSON.stringify(res))
                  },
                  (err)=>{
                    console.log(err);
                   
                  }
                )
                 this.router.navigate(['movie'])
              },
              (sessionError) => {
                console.error('Session creation error:', sessionError);
              }
            );
          },
          (loginError) => {
            // Handle login error
            console.error('Login error:', loginError);
          }
        );
      });
    }
  }

