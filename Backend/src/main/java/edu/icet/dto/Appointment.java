package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Appointment {
    private int appointmentid;
    private String appointmentDateTime;
    private String mode;
    private String status;
    private String DateTimeStats;
    private int patientId;
    private int doctorId;
}
