import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() loginClick = new EventEmitter<void>();

  onLoginClick(event: Event): void {
    event.preventDefault();
    this.loginClick.emit(); // Notify parent to open login modal
  }
}
