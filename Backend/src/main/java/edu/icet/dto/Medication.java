package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Medication {
    private int medicationId;
    private String prescribedBy;
    private String medicationName;
    private String medicationDose;
    private String medicationDuration;
    private String medicationFrequency;
    private String medicationInstructions;
    private String dateTimeStats;
    private int patientId;
    private int doctorId;
}
