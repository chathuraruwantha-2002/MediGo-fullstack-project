// appointment-more-info-patient.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { appointment } from '../../../model/appointment';
import { Patient } from '../../../model/patient';
import { PatientHealthData } from '../../../model/patientHealthData';

@Component({
  selector: 'app-appointment-more-info-patient',
  imports: [CommonModule],
  templateUrl: './appointment-more-info-patient.component.html',
  styleUrl: './appointment-more-info-patient.component.css'
})
export class AppointmentMoreInfoPatientComponent {



  // Modal control
    @Input() showModal: boolean = false;
    @Output() closeModalEvent = new EventEmitter<void>();
  
  
    // data from selected appointment from parent
    @Input() selectedAppointment: appointment | null = null;
  
  

  constructor() { }

  ngOnInit(): void {
  }

  // Method to handle edit appointment
  editAppointment(): void {
    console.log('Edit appointment clicked');
    // edit logic here
  }

  // Method to print details
  printDetails(): void {
    console.log('Print details clicked');
    // print logic here
    window.print();
  }

  // Helper method to format date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
  }

  // Helper method to get reason or default text
  getReasonForVisit(): string {
    return this.selectedAppointment?.reasonVisit || 'General consultation';
  }

  
}