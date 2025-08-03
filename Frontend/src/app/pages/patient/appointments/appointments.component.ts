import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { appointment } from '../../../model/appointment';
import { UserService } from '../../../services/user.service';
import { AppointmentMoreInfoPatientComponent } from '../../PopUps@Dialogs/appointment-more-info-patient/appointment-more-info-patient.component';

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule, AppointmentMoreInfoPatientComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  standalone: true
})
export class AppointmentsComponent {

  appointments: appointment[] = [];
  searchTerm: string = '';

  // Patient info form navigation
  showPatientForm = false;
  selectedAppointment: appointment | null = null;

  constructor(private http: HttpClient, private userService: UserService) {
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



  getStatusClass(status: string) {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'badge-reviewed';
      case 'pending':
        return 'badge-pending';
      case 'cancelled':
      case 'rejected':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  }



  isOnline(location: string): boolean {
    return location?.toLowerCase().includes('online');
  }

  // Appointment info form navigation 
  openAppointmentForm(appointment: any) {
    this.selectedAppointment = appointment;
    this.showPatientForm = true;
    console.log(this.selectedAppointment);
  }

  closeAppointmentForm() {
    this.showPatientForm = false;
    this.selectedAppointment = null;
  }

}
