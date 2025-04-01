export class Prescription {
    medicationId: number;
    patientId: number;
    doctorId: number;
    prescribedBy: string;
    medicationName: string;
    dosage: string;
    medicationDuration: string;
    frequency: string;
    instructions: string;
    issuedDateTime: string;
    status: string;
    nextVisitDate: string;

    constructor(
        medicationId: number,
        patientId: number,
        doctorId: number,
        prescribedBy: string,
        medicationName: string,
        dosage: string,
        MedicationDuration: string,
        frequency: string,
        instructions: string,
        issuedDateTime: string,
        status: string,
        nextVisitDate: string
    ) {
        this.medicationId = medicationId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.prescribedBy = prescribedBy;
        this.medicationName = medicationName;
        this.dosage = dosage;
        this.medicationDuration = MedicationDuration;
        this.frequency = frequency;
        this.instructions = instructions;
        this.issuedDateTime = issuedDateTime;
        this.status = status;
        this.nextVisitDate = nextVisitDate;
    }
}
