package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Doctor {
    private int doctorId;
    private String name;
    private String gender;
    private String phone;
    private String email;
    private String specialization;
    private String qualification;
    private String experience;
    private String location;
    private String availability;
    private double consultationFee;
    private int userId;
    private int hospitalId;
}
