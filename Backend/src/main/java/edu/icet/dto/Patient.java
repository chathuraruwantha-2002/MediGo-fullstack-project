package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Patient {
    private int patientId;
    private String name;
    private String gender;
    private String phone;
    private String dob;
    private String address;
    private String bloodGroup;
    private String medicalHistory;
    private String allergies;
    private int userId;
}
