
    export class appointment {
        appointmentId: number;
        appointmentDate: string;
        appointmentTime: string;
        location: string;
        reasonVisit: string;
        status: string;
        DateTimeStats: string;
        patientId: number;
        doctorId: number;
    
        constructor(appointmentId: number, appointmentDate: string, appointmentTime: string, loaction: string, reasonVisit: string, status: string, DeteTimeStats: string, patientId: number, doctorId: number) {
            this.appointmentId = appointmentId;
            this.appointmentDate = appointmentDate;
            this.appointmentTime = appointmentTime;
            this.location = loaction;
            this.reasonVisit = reasonVisit;
            this.status = status;
            this.DateTimeStats = DeteTimeStats;
            this.patientId = patientId;
            this.doctorId = doctorId;
        }
    }
    






