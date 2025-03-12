import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagePatientComponent } from './homepage-patient.component';

describe('HomepagePatientComponent', () => {
  let component: HomepagePatientComponent;
  let fixture: ComponentFixture<HomepagePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepagePatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepagePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
