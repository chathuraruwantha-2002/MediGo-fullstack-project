export class DoctorStat {
  doctorStatId: number;
  balance: number;
  acceptedAppointments: number;
  rejectedAppointments: number;
  rating: number;
  linkedDoctorId: number;

  constructor(
    doctorStatId: number,
    balance: number,
    acceptedAppointments: number,
    rejectedAppointments: number,
    rating: number,
    linkedDoctorId: number
  ) {
    this.doctorStatId = doctorStatId;
    this.balance = balance;
    this.acceptedAppointments = acceptedAppointments;
    this.rejectedAppointments = rejectedAppointments;
    this.rating = rating;
    this.linkedDoctorId = linkedDoctorId;
  }
}
