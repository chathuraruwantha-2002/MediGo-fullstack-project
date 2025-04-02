package edu.icet.service.interfaces.patientInterfaces;

import edu.icet.dto.Appointment;

import java.util.List;

public interface PatientAppointmentService {
    List<Appointment> getAll(int id);

    List<String> getAllDoctors();

    String addAppointment(Appointment appointment);
}
