package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PatientHealthData {
    private int recordId;
    private double bloodPressure;
    private double bloodSugar;
    private double heartRate;
    private double oxygenLevel;
    private double weight;
    private double height;
    private double bmi;
    private double bodyTemperature;
    private String dateTimeStats;
    private int userId;
}
