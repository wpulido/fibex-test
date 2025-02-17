import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet, RouterModule, NgFor, NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarOpen: boolean = true;

  menuItems = [
      { label: 'Home', link: 'dashboard', icon: '🏠' },
      { label: 'Products', link: 'product', icon: '📦' },
      // { label: 'Logout', link: '/logout', icon: '🚪' },
  ];
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
