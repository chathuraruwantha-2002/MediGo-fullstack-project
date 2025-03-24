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
@Table(name = "patient")
public class PatientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patientId;
    private String name;
    private String gender;
    private String phone;
    private String dob;
    private String address;
    private String bloodGroup;
    private String medicalHistory;
    private String allergies;
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
