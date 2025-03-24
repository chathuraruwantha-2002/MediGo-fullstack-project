export class Patient {
    patientId: number;
    name: string;
    gender: string;
    phone: string;
    dob: string;
    address: string;
    bloodGroup: string;
    medicalHistory: string;
    allergies: string;
    userId: number;

    constructor(patientId: number, name: string, gender: string, phone: string, dob: string, address: string, bloodGroup: string, medicalHistory: string, allergies: string, userId: number) {
        this.patientId = patientId;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.dob = dob;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.medicalHistory = medicalHistory;
        this.allergies = allergies;
        this.userId = userId;
    }
}
