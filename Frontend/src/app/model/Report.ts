export class Report {
    reportId: number;
    type: string;
    dateGenerated: string;
    status: string;
    description: string;
    doctorId: number;
    patientId: number;
  
    constructor(
      reportId: number,
      type: string,
      dateGenerated: string,
      status: string,
      description: string,
      doctorId: number,
      patientId: number
    ) {
      this.reportId = reportId;
      this.type = type;
      this.dateGenerated = dateGenerated;
      this.status = status;
      this.description = description;
      this.doctorId = doctorId;
      this.patientId = patientId;
    }
}