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
  @Output() featuresClick = new EventEmitter<void>();
  @Output() doctorsClick = new EventEmitter<void>();
  @Output() contactClick = new EventEmitter<void>();

  onLoginClick(event: Event): void {
    event.preventDefault();
    this.loginClick.emit(); // Notify parent to open login modal
  }

  onFeaturesClick(event: Event) {
    event.preventDefault();
    this.featuresClick.emit(); // Emit to parent
  }

  onDoctorsClick(event: Event) {
    event.preventDefault();
    this.doctorsClick.emit(); // Emit to parent
  }

  onContactClick(event: Event) {
    event.preventDefault();
    this.contactClick.emit(); // Emit to parent
  }
}
