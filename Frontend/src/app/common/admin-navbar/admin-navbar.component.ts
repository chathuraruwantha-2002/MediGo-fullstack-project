import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Patient } from '../../model/patient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

}
