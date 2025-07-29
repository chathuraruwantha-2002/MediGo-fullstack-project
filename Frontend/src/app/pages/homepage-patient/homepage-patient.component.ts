import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../model/patient';
import { CommonModule } from '@angular/common';
import { PatientHealthData } from '../../model/patientHealthData';
import { SharedService } from '../../shared.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-homepage-patient',
  templateUrl: './homepage-patient.component.html',
  styleUrls: ['./homepage-patient.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomepagePatientComponent implements AfterViewInit {

  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  LineChart: any;


  patientStats: PatientHealthData | undefined;
  patient: Patient | undefined;



  // Dummy data for the line chart
  healthHistory = [
    { date: '2025-07-01', systolic: 120, bmi: 22.3, sugar: 95 },
    { date: '2025-07-08', systolic: 125, bmi: 22.6, sugar: 102 },
    { date: '2025-07-15', systolic: 130, bmi: 23.0, sugar: 110 },
    { date: '2025-07-22', systolic: 138, bmi: 23.2, sugar: 118 },
    { date: '2025-07-29', systolic: 135, bmi: 23.1, sugar: 114 }
  ];

  message: string = '';

  statusBloodPressure: string = 'Normal';
  statusBloodSugar: string = 'Normal';
  statusBloodCount: string = 'Normal';
  statusBMI: string = 'Normal';

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.loadPatientHealthStats();
    this.loadPatientData();
  }

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  // Send message and route
  send() {
    if (this.message.trim()) {
      this.sharedService.setMessage(this.message);
      console.log('Message sent:', this.message);
      this.message = '';
      this.router.navigate(['/patient/services']);
    }
  }

  private loadPatientHealthStats() {
    this.http.get<PatientHealthData>('http://localhost:8080/patient/dashboard/get-health-stats/1').subscribe(data => {
      console.log(data);
      this.patientStats = data;
      this.displayStatusColors();
      this.createLineChart();
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



  private createLineChart() {
    const labels = this.healthHistory.map(d => d.date);
    const systolicData = this.healthHistory.map(d => d.systolic);
    const bmiData = this.healthHistory.map(d => d.bmi);
    const sugarData = this.healthHistory.map(d => d.sugar);

    this.LineChart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Systolic Blood Pressure',
            data: systolicData,
            borderColor: 'rgba(255, 0, 55, 1)',
            backgroundColor: 'rgba(255, 99, 133, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'BMI',
            data: bmiData,
            borderColor: 'rgba(5, 125, 162, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Blood Sugar',
            data: sugarData,
            borderColor: '#0c3868',
            backgroundColor: 'rgba(54, 163, 235, 0)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Health Trend',
            font: {
              size: 15
            }
          },
          legend: {
            display: false,
            position: 'top'
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            beginAtZero: true
          }
        }
      }
    });
  }



}
