import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./common/navbar/navbar.component";
import { HomepageComponent } from "./common/homepage/homepage.component";
import { PatientNavbarComponent } from "./common/patient-navbar/patient-navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HomepageComponent, PatientNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MediGo_fullstack_Project';
}
