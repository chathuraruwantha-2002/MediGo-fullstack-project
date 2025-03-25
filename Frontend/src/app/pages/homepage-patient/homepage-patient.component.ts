import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../model/patient';
import { CommonModule } from '@angular/common';
import { PatientHealthData } from '../../model/patientHealthData';

@Component({
  selector: 'app-homepage-patient',
  templateUrl: './homepage-patient.component.html',
  styleUrl: './homepage-patient.component.css',
  imports: [CommonModule]
})
export class HomepagePatientComponent {

  patientStats: PatientHealthData | undefined;
  patient: Patient | undefined;

  statusBloodPressure: string = 'Normal';
  statusBloodSugar: string = 'Normal';
  statusBloodCount: string = 'Normal';
  statusBMI: string = 'Normal';


  constructor(private http: HttpClient) {
    this.loadPatientHealthStats();
    this.loadPatientData();
  }

  private loadPatientHealthStats() {

    this.http.get<PatientHealthData>('http://localhost:8080/patient/dashboard/get-health-stats/1').subscribe(data => {
      console.log(data);
      this.patientStats = data;
      
      this.displayStatusColors();
    });
  }

  private displayStatusColors() {
    if (this.patientStats?.bloodPressure != null) {
      this.statusBloodPressure =
        this.patientStats.bloodPressure >= 160 ? "High" :
        (this.patientStats.bloodPressure >= 120 ? "Normal" : "Low");
    }

    if (this.patientStats?.bloodSugar != null) {
      this.statusBloodSugar =
        this.patientStats.bloodSugar > 180 ? "High" :
        (this.patientStats.bloodSugar >= 120 ? "Normal" : "Low");
    }

    if (this.patientStats?.bmi != null) {
      this.statusBMI =
        this.patientStats.bmi >= 30 ? "High" :
        (this.patientStats.bmi >= 25 ? "Normal" : "Low");
    }

    if (this.patientStats?.heartRate != null) {
      this.statusBloodCount =
        this.patientStats.heartRate >= 100 ? "High" :
        (this.patientStats.heartRate >= 60 ? "Normal" : "Low");
    }
  }

  private loadPatientData() {
    this.http.get<Patient>('http://localhost:8080/patient/dashboard/get-user/1').subscribe(data => {
      console.log(data);
      this.patient = data;
    });
  }


}
