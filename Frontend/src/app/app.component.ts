import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./common/navbar/navbar.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { PatientNavbarComponent } from "./common/patient-navbar/patient-navbar.component";
import { HomepagePatientComponent } from "./pages/homepage-patient/homepage-patient.component";
import { FindComponent } from "./pages/find/find.component";
import { OnInit } from '@angular/core';
import { AppointmentFormComponent } from "./pages/PopUps@Dialogs/appointment-form/appointment-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HomepageComponent, PatientNavbarComponent, HomepagePatientComponent, FindComponent, AppointmentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'MediGo_fullstack_Project';
}