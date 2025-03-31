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
@Table(name = "Report")
public class ReportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reportId;
    private String type;
    private String dateGenerated;
    private String status;
    private String description;
    @ManyToOne
    @JoinColumn(name = "doctorId")
    private DoctorEntity doctor;
    @ManyToOne
    @JoinColumn(name = "patientId")
    private PatientEntity patient;
}
