package edu.icet.service.impl.adminService;

import edu.icet.dto.Appointment;
import edu.icet.entity.AppointmentEntity;
import edu.icet.repository.AppointmentRepository;
import edu.icet.repository.UserRepository;
import edu.icet.service.interfaces.adminInterfaces.AdminAppointmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAppointmentServiceImpl implements AdminAppointmentService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    @Override
    public List<Appointment> getAll() {
        List<Appointment> appointments = new ArrayList<>();
        List<AppointmentEntity> allAppointments = appointmentRepository.findAll();

        for (AppointmentEntity appointmentEntity : allAppointments) {
            Appointment appointment = modelMapper.map(appointmentEntity, Appointment.class);

            appointment.setPatientName(appointmentEntity.getPatient().getName());
            appointment.setDoctorName(appointmentEntity.getDoctor().getName());

            appointments.add(appointment);
        }

        return appointments;
    }

    @Override
    public String addAppointment(Appointment appointment) {
        appointmentRepository.save(modelMapper.map(appointment, AppointmentEntity.class));
        return "Success";
    }

    @Override
    public String updateAppointment(Appointment appointment) {
        appointmentRepository.save(modelMapper.map(appointment, AppointmentEntity.class));
        return "Success";
    }

    @Override
    public String deleteAppointment(int id) {
        appointmentRepository.deleteById(id);
        return "Success";
    }
}
