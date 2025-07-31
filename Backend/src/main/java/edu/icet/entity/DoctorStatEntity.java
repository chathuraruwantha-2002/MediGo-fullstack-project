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
@Table(name = "doctor_stat")
public class DoctorStatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorStatId;
    private double balance;
    private int acceptedAppointments;
    private int rejectedAppointments;
    private double rating;
    @OneToOne
    @JoinColumn(name = "doctor_id")
    private DoctorEntity doctor;
}
