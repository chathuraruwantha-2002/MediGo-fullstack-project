import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMoreInfoPatientComponent } from './appointment-more-info-patient.component';

describe('AppointmentMoreInfoPatientComponent', () => {
  let component: AppointmentMoreInfoPatientComponent;
  let fixture: ComponentFixture<AppointmentMoreInfoPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentMoreInfoPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentMoreInfoPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
