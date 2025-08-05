package edu.icet.service.interfaces.adminInterfaces;

import edu.icet.dto.Appointment;

import java.util.List;

public interface AdminAppointmentService {
    List<Appointment> getAll();

    String addAppointment(Appointment appointment);

    String deleteAppointment(int id);

    String updateAppointment(Appointment appointment);
}
