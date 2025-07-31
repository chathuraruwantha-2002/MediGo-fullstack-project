import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AppointmentFormComponent } from "../PopUps@Dialogs/appointment-form/appointment-form.component";
import { Chart } from 'chart.js';
import { Prescription } from '../../../model/Prescription';
import { PatientHealthData } from '../../../model/patientHealthData';
import { Report } from '../../../model/Report';
import { DoctorStat } from '../../../model/doctorStats';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, AppointmentFormComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  standalone: true
})
export class ReportsComponent implements AfterViewInit{


    @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('earningsChart') earningsChartRef!: ElementRef<HTMLCanvasElement>;
    LineChart: any;
    EarningsChart: any;


   monthlyAppointments = [
  { month: 'January', totalAppointments: 25 },
  { month: 'February', totalAppointments: 18 },
  { month: 'March', totalAppointments: 30 },
  { month: 'April', totalAppointments: 22 },
  { month: 'May', totalAppointments: 28 },
  { month: 'June', totalAppointments: 35 },
  { month: 'July', totalAppointments: 40 },
  { month: 'August', totalAppointments: 33 },
  { month: 'September', totalAppointments: 26 },
  { month: 'October', totalAppointments: 31 },
  { month: 'November', totalAppointments: 29 },
  { month: 'December', totalAppointments: 38 }
];

monthlyEarnings = [
  { month: 'January', totalEarnings: 1200 },
  { month: 'February', totalEarnings: 980 },
  { month: 'March', totalEarnings: 1500 },
  { month: 'April', totalEarnings: 1340 },
  { month: 'May', totalEarnings: 1650 },
  { month: 'June', totalEarnings: 1700 },
  { month: 'July', totalEarnings: 1900 },
  { month: 'August', totalEarnings: 1750 },
  { month: 'September', totalEarnings: 1430 },
  { month: 'October', totalEarnings: 1580 },
  { month: 'November', totalEarnings: 1490 },
  { month: 'December', totalEarnings: 2000 }
];




  

  doctorStats: DoctorStat | undefined;

  

  constructor(private http: HttpClient) {
   this.loadDoctorStats(); 
  }
  ngAfterViewInit(): void {
    this.createLineChart();
    this.createEarningsChart();
  }

  
  private loadDoctorStats() {
    this.http.get<DoctorStat>('http://localhost:8080/doctor/dashboard/get-doctor-stats/3').subscribe(data => {
      console.log(data);
      this.doctorStats = data;
    });
  }



 private createLineChart() {
  const labels = this.monthlyAppointments.map(d => d.month);
  const appointmentData = this.monthlyAppointments.map(d => d.totalAppointments);

  this.LineChart = new Chart(this.lineChartRef.nativeElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Appointments Per Month',
          data: appointmentData,
          borderColor: '#4caf4f',
          backgroundColor: 'rgba(76, 175, 79, 0.06)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: 'Monthly Appointment Statistics',
          font: {
            size: 16
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
          beginAtZero: true,
          grid: {
            display: true
          },
          title: {
            display: true,
            text: 'Appointments Count'
          }
        }
      }
    }
  });
}


private createEarningsChart() {
  const labels = this.monthlyEarnings.map(d => d.month);
  const earningsData = this.monthlyEarnings.map(d => d.totalEarnings);

  this.EarningsChart = new Chart(this.earningsChartRef.nativeElement, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Earnings Per Month (LKR)',
          data: earningsData,
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33, 149, 243, 0.07)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
          text: 'Monthly Earnings Statistics',
          font: {
            size: 16
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
          beginAtZero: true,
          grid: {
            display: true
          },
          title: {
            display: true,
            text: 'Earnings (LKR)'
          }
        }
      }
    }
  });
}








}
