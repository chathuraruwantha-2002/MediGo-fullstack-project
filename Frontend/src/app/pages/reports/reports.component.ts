import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../model/Report';
import { Component } from '@angular/core';
import { Prescription } from '../../model/Prescription';
import { AppointmentFormComponent } from "../PopUps@Dialogs/appointment-form/appointment-form.component";
import { PatientHealthData } from '../../model/patientHealthData';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true
})
export class ReportsComponent {

  reportList: Report[] = [];
  prescriptionList: Prescription[] = [];
  doctorsNames: string[] = [];

  patientStats: PatientHealthData | undefined;

  statusBloodPressure: string = 'Normal';
  statusBloodSugar: string = 'Normal';
  statusBloodCount: string = 'Normal';
  statusBMI: string = 'Normal';

  constructor(private http: HttpClient) {
    this.loadReports();
    this.loadPrescriptions();
    this.loadAllDoctorsNames();
    this.loadPatientHealthStats();
  }

  private loadReports(){
    this.http.get<Report[]>('http://localhost:8080/patient/report/get-all-reports/1').subscribe(data => {
      this.reportList = data;
      console.log(data);
    })
  }

  public loadAllDoctorsNames() {
    this.http.get<string[]>('http://localhost:8080/patient/appointment/get-all-doctors').subscribe(data => {
      console.log(data);
      this.doctorsNames = data;
    });
  }

  private loadPrescriptions(){
    this.http.get<Prescription[]>('http://localhost:8080/patient/report/get-all-prescriptions/1').subscribe(data => {
      this.prescriptionList = data;
      console.log(data);
    })
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


}
