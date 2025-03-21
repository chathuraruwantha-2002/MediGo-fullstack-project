import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-navbar',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './patient-navbar.component.html',
  styleUrl: './patient-navbar.component.css'
})
export class PatientNavbarComponent {

}
