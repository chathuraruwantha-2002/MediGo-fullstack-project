package edu.icet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "patient_health_data")
public class PatientHealthDataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
