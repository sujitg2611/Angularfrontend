import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side_nav.component.html',
  styleUrls: ['./side_nav.component.css']
})
export class SideNavComponent {
  showEmployeeMenu = false;

  toggleEmployeeMenu() {
    this.showEmployeeMenu = !this.showEmployeeMenu;
  }
}
