export class PatientHealthData {
    recordId: number;
    bloodPressure: number;
    bloodSugar: number;
    heartRate: number;
    oxygenLevel: number;
    weight: number;
    height: number;
    bmi: number;
    bodyTemperature: number;
    dateTimeStats: string;
    userId: number;

    constructor(recordId: number, bloodPressure: number, bloodSugar: number, heartRate: number, oxygenLevel: number, weight: number, height: number, bmi: number, bodyTemperature: number, dateTimeStats: string, userId: number) {
        this.recordId = recordId;
        this.bloodPressure = bloodPressure;
        this.bloodSugar = bloodSugar;
        this.heartRate = heartRate;
        this.oxygenLevel = oxygenLevel;
        this.weight = weight;
        this.height = height;
        this.bmi = bmi;
        this.bodyTemperature = bodyTemperature;
        this.dateTimeStats = dateTimeStats;
        this.userId = userId;
    }
}