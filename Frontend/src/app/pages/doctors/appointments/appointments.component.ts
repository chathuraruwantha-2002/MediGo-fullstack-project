import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { appointment } from '../../../model/appointment';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule,FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  standalone: true
})
export class AppointmentsComponent {

  appointments: appointment[] = [];
  searchTerm: string = ''; 

  constructor(private http: HttpClient) {
    this.loadAllAppointments();
  }


  private loadAllAppointments() {
    this.http.get<appointment[]>('http://localhost:8080/doctor/appointment/get-all/3').subscribe(data => {
      console.log(data);
      this.appointments = data;
    });
  }

  
  filteredAppointments(): appointment[] {
    if (!this.searchTerm.trim()) return this.appointments;

    return this.appointments.filter(app => {
      const lowerSearch = this.searchTerm.toLowerCase();
      return 
        app.appointmentDate.toLowerCase().includes(lowerSearch)
        || app.appointmentTime.toLowerCase().includes(lowerSearch)
        || app.location?.toLowerCase().includes(lowerSearch);
    });
  }

}
