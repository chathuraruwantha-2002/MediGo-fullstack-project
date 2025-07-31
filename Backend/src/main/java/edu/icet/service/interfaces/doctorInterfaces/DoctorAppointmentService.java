package edu.icet.service.interfaces.doctorInterfaces;

import edu.icet.dto.Appointment;

import java.util.List;

public interface DoctorAppointmentService {
    List<Appointment> getAll(int id);

    String addAppointment(Appointment appointment);

    String updateAppointment(Appointment appointment);
    String deleteAppointment(int id);
}
