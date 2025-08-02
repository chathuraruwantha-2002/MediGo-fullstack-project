export class appointment {
    appointmentId: number;
    appointmentDate: string;
    appointmentTime: string;
    location: string;
    reasonVisit: string;
    status: string;
    dateTimeStats: string;
    patientId: number;
    doctorId: number;
    patientName: string;
    doctorName: string;

    constructor(
        appointmentId: number,
        appointmentDate: string,
        appointmentTime: string,
        location: string,
        reasonVisit: string,
        status: string,
        dateTimeStats: string,
        patientId: number,
        doctorId: number,
        patientName: string,
        doctorName: string
    ) {
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.location = location;
        this.reasonVisit = reasonVisit;
        this.status = status;
        this.dateTimeStats = dateTimeStats;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.patientName = patientName;
        this.doctorName = doctorName;
    }
}
