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
@Table(name = "symptom_report_ai")
public class SymptomReportAiEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;
    private String symptoms;
    private String description;
    private String predictedDisease;
    private double confidenceScore;
    private String dateTimeStats;
    private int userId;
}
