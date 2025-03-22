package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SymptomReportAi {
    private int reportId;
    private String symptoms;
    private String description;
    private String predictedDisease;
    private double confidenceScore;
    private String dateTimeStats;
    private int userId;
}
