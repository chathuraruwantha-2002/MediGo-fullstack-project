import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomepagePatientComponent } from './pages/patient/homepage-patient/homepage-patient.component';
import { PatientNavbarComponent } from './common/patient-navbar/patient-navbar.component';
import { FindComponent } from './pages/patient/find/find.component';
import { DoctorNavbarComponent } from './common/doctor-navbar/doctor-navbar.component';
import { HomepageComponent as HomepageDoctorComponent } from './pages/doctors/homepage/homepage.component';
import { AppointmentsComponent as AppointmentsDoctorComponent } from './pages/doctors/appointments/appointments.component';
import { FindComponent as FindDoctorComponent } from './pages/doctors/find/find.component';
import { ServicesComponent as ServicesDoctorComponent } from './pages/doctors/services/services.component';
import { ReportsComponent as ReportsDoctorComponent } from './pages/doctors/reports/reports.component';
import { AppointmentsComponent } from './pages/patient/appointments/appointments.component';
import { ServicesComponent } from './pages/patient/services/services.component';
import { ReportsComponent } from './pages/patient/reports/reports.component';


export const routes: Routes = [
    {
        path: "",
        component: HomepageComponent
    },

    {
        path: "patient",
        component: PatientNavbarComponent,
        children: [
            {
                path: "",
                component: HomepagePatientComponent
            },
            {
                path: "homepage",
                component: HomepagePatientComponent
            },
            {
                path: "appointments",
                component: AppointmentsComponent
            },
            {
                path: "find",
                component:FindComponent
            },
            {
                path: "services",
                component:ServicesComponent
            },
            {
                path: "reports",
                component:ReportsComponent
            }
        ]

    },

    {
        path: "doctor",
        component: DoctorNavbarComponent,
        children: [
            {
                path: "",
                component: HomepageDoctorComponent
            },
            {
                path: "homepage",
                component: HomepageDoctorComponent
            },
            {
                path: "appointments",
                component: AppointmentsDoctorComponent
            },
            {
                path: "find",
                component:FindDoctorComponent
            },
            {
                path: "services",
                component:ServicesDoctorComponent
            },
            {
                path: "reports",
                component:ReportsDoctorComponent
            }
        ]

    }


];
