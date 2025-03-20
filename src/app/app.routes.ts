import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomepagePatientComponent } from './pages/homepage-patient/homepage-patient.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { PatientNavbarComponent } from './common/patient-navbar/patient-navbar.component';
import { FindComponent } from './pages/find/find.component';
import { ServicesComponent } from './pages/services/services.component';

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
            }
        ]
    }
];
