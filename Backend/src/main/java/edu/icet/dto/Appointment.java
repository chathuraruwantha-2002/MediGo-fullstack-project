package edu.icet.dto;

import edu.icet.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Appointment {
    private int appointmentId;
    private String appointmentDate;
    private String appointmentTime;
    private String location;
    private String reasonVisit;
    private Status status;
    private String dateTimeStats;
    private int patientId;
    private int doctorId;
}
