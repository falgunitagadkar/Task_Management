import { Component, Input } from '@angular/core';
import { NgIf,NgClass } from '@angular/common';
import { RouterLinkActive,RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,NgClass,RouterLinkActive,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isOpen! : boolean;
    // icons = icons;
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    }

    closeSidebar() {
      this.isOpen = false;
    }
}
