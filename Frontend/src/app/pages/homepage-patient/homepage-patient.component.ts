import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-homepage-patient',
  imports: [],
  templateUrl: './homepage-patient.component.html',
  styleUrl: './homepage-patient.component.css'
})
export class HomepagePatientComponent {

  patientStats: Patient | undefined;

  constructor(private http: HttpClient) {
    this.loadPatientData();
  }

  private loadPatientData() {
    
    this.http.get<Patient>('http://localhost:8080/patient/dashboard/get-health-stats/1').subscribe(data => {
      console.log(data);
      this.patientStats = data;
    });

  }


}
