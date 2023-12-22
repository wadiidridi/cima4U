// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: any[] = [];
  title = 'cima4uu';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    // const sessionId = this.authService.getSessionId();
    // this.isAuthenticated = !!sessionId;
  }
  // isUserAuthenticated(): boolean {
  //   return this.authService.isUserAuthenticated();
  // }
}
