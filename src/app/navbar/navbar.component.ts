import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  active: string | null = null;

  setActive(menuItem: string) {
    this.active = menuItem;
  }
}
