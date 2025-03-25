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

  statusBloodPressure: string = 'Normal';
  statusBloodSugar: string = 'Normal';
  statusBloodCount: string = 'Normal';
  statusBMI: string = 'Normal';
  status: string = 'Normal';


  constructor(private http: HttpClient) {
    this.loadPatientData();
  }

  private loadPatientData() {

    this.http.get<PatientHealthData>('http://localhost:8080/patient/dashboard/get-health-stats/1').subscribe(data => {
      console.log(data);
      this.patientStats = data;

      this.displayStatusColors();
    });
  }

  private displayStatusColors() {

    if (this.patientStats?.bloodPressure != null) {
      this.status =
        this.patientStats.bloodPressure >= 160 ? "High" :
        (this.patientStats.bloodPressure >= 120 ? "Medium" : "Low");
    }
  }

}
