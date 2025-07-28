import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appointment } from '../../model/appointment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule,FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  standalone: true
})
export class AppointmentsComponent {

  appointments: appointment[] = [];
  doctorsNames: string[] = [];
  searchTerm: string = ''; 

  constructor(private http: HttpClient) {
    this.loadAllAppointments();
  }


  private loadAllAppointments() {
    this.http.get<appointment[]>('http://localhost:8080/patient/appointment/get-all/3').subscribe(data => {
      console.log(data);
      this.appointments = data;
      this.loadAllDoctorsNames();
    });
  }

  public loadAllDoctorsNames() {
    this.http.get<string[]>('http://localhost:8080/patient/appointment/get-all-doctors').subscribe(data => {
      console.log(data);
      this.doctorsNames = data;
      
    });
  }

  filteredAppointments(): appointment[] {
    if (!this.searchTerm.trim()) return this.appointments;

    return this.appointments.filter(app => {
      const doctorName = this.doctorsNames[app.doctorId - 1] || '';
      const lowerSearch = this.searchTerm.toLowerCase();
      return doctorName.toLowerCase().includes(lowerSearch)
        || app.appointmentDate.toLowerCase().includes(lowerSearch)
        || app.appointmentTime.toLowerCase().includes(lowerSearch)
        || app.location?.toLowerCase().includes(lowerSearch);
    });
  }

}
