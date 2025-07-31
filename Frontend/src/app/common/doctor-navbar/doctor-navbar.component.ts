import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Patient } from '../../model/patient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-navbar',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './doctor-navbar.component.html',
  styleUrl: './doctor-navbar.component.css'
})
export class DoctorNavbarComponent {

}
