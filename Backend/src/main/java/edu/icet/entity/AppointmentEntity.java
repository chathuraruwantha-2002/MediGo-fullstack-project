package edu.icet.entity;

import edu.icet.enums.Status;
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
@Table(name = "appointment")
public class AppointmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentid; //update this aftr i --> I
    private String appointmentDate;
    private String appointmentTime;
    private String location;
    private String mode;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String dateTimeStats;
    @ManyToOne
    @JoinColumn(name = "patientId")
    private PatientEntity patient;
    @ManyToOne
    @JoinColumn(name = "doctorId")
    private DoctorEntity doctor;
}
