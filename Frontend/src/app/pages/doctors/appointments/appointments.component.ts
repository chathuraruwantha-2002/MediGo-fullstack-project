import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { appointment } from '../../../model/appointment';
import { UserService } from '../../../services/user.service';
import { PatientInfoFormComponent } from "../../PopUps@Dialogs/patient-info-form/patient-info-form.component";


@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule, PatientInfoFormComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
  standalone: true
})
export class AppointmentsComponent {

  appointments: appointment[] = [];
  searchTerm: string = '';

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

    this.http.get<appointment[]>(`http://localhost:8080/doctor/appointment/get-all/${accountId}`).subscribe(data => {
      console.log(data);
      this.appointments = data;
    });
  }


  filteredAppointments(): appointment[] {
    if (!this.searchTerm.trim()) return this.appointments;

    return this.appointments.filter(app => {
      const patientName = app.patientName || '';
      const lowerSearch = this.searchTerm.toLowerCase();
      return patientName.toLowerCase().includes(lowerSearch)
        || app.appointmentDate.toLowerCase().includes(lowerSearch)
        || app.appointmentTime.toLowerCase().includes(lowerSearch)
        || app.location?.toLowerCase().includes(lowerSearch);
    });
  }





  onStatusChange(appointment: any) {
    console.log(appointment);
    this.http.put('http://localhost:8080/doctor/appointment/update-appointment', appointment, {
      responseType: 'text'
    }).subscribe({
      next: (response) => {
        console.log('Status updated successfully:', response);
        // success message here
      },
      error: (error) => {
        console.error('Failed to update status:', error);
        // error message here
      }
    });
  }


  isOnline(location: string): boolean {
    return location?.toLowerCase().includes('online');
  }


  // Patient info form navigation 
  openPatientForm(appointment: any) {
    this.selectedAppointment = appointment;
    this.showPatientForm = true;
    console.log(this.selectedAppointment);
  }

  closePatientForm() {
    this.showPatientForm = false;
    this.selectedAppointment = null;
  }

}
