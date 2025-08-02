import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appointment } from '../../../model/appointment';
import { PatientHealthData } from '../../../model/patientHealthData';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../../model/patient';


@Component({
  selector: 'app-patient-info-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-info-form.component.html',
  styleUrl: './patient-info-form.component.css'
})
export class PatientInfoFormComponent implements OnInit {

  // Modal control
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();


  // data from selected appointment from parent
  @Input() selectedAppointment: appointment | null = null;

  // data from api
  patientStats: Patient | null = null;
  patientHealthStats: PatientHealthData | null = null;
  patientAge: number = 0;



  @Output() viewHistoryClicked = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.selectedAppointment);
    this.loadPatientHealthStats();
    this.loadPatientStats();

  }


  private loadPatientHealthStats() {
    this.http
      .get<PatientHealthData>(`http://localhost:8080/patient/dashboard/get-health-stats/${this.selectedAppointment?.patientId}`)
      .subscribe((data) => {
        console.log('Patien health stats:', data);
        this.patientHealthStats = data;
      });
  }


  private loadPatientStats() {
    this.http
      .get<Patient>(`http://localhost:8080/patient/dashboard/get-user-info/${this.selectedAppointment?.patientId}`)
      .subscribe((data) => {
        console.log('Patient stats:', data);
        this.patientStats = data;

        this.patientAge = this.calculateAgeFromBirthdate(data.dob);
      });
  }




  calculateAgeFromBirthdate(birthdate: string): number {
    if (!birthdate) return 0;

    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }



  getStatusClass(status: string): string {

    if (!status) return 'status-pending';

    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  }


  closeModal(): void {
    this.closeModalEvent.emit();
  }


  viewHistory(): void {
    this.viewHistoryClicked.emit();
  }


}