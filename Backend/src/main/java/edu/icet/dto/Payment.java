package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Payment {
    private int paymentId;
    private double amount;
    private String method;
    private String status;
    private String dateTimeStats;
    private int patientId;
    private int doctorId;
}
