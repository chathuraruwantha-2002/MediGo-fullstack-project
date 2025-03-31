package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Report {
    private int reportId;
    private String type;
    private String dateGenerated;
    private String status;
    private String description;
    private int doctorId;
    private int patientId;
}
