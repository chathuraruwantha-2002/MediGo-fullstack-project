import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appointment } from '../../model/appointment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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

  constructor(private http: HttpClient , private userService: UserService) {
    this.loadAllAppointments();
  }


  private loadAllAppointments() {

    const accountId = this.userService.getAccountId();
    
    if (!accountId) {
      console.warn("No account ID found. Redirecting or showing error...");
      return;
    }

    this.http.get<appointment[]>(`http://localhost:8080/patient/appointment/get-all/${accountId}`).subscribe(data => {
      console.log(data);
      this.appointments = data;
    });
  }


  filteredAppointments(): appointment[] {
    if (!this.searchTerm.trim()) return this.appointments;

    return this.appointments.filter(app => {
      const patientName = app.doctorName || '';
      const lowerSearch = this.searchTerm.toLowerCase();
      return patientName.toLowerCase().includes(lowerSearch)
        || app.appointmentDate.toLowerCase().includes(lowerSearch)
        || app.appointmentTime.toLowerCase().includes(lowerSearch)
        || app.location?.toLowerCase().includes(lowerSearch);
    });
  }

}
