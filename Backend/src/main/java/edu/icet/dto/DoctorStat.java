package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DoctorStat {
    private int doctorStatId;
    private double balance;
    private int acceptedAppointments;
    private int rejectedAppointments;
    private double rating;
    private int linkedDoctorId;  // Renamed field to avoid ambiguity "for now"
}

