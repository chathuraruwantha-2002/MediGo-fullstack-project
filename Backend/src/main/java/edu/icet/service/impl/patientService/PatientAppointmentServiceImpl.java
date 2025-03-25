package edu.icet.service.impl.patientService;

import edu.icet.dto.Appointment;
import edu.icet.entity.AppointmentEntity;
import edu.icet.repository.AppointmentRepository;
import edu.icet.service.interfaces.patientInterfaces.PatientAppointmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
public class PatientAppointmentServiceImpl implements PatientAppointmentService {

    private final ModelMapper modelMapper;
    private final AppointmentRepository appointmentRepository;
    @Override
    public List<Appointment> getAll(int id) {
        List<Appointment> appointments = new ArrayList<>();
        List<AppointmentEntity> allByUserId = appointmentRepository.findAllByUserId(id);

        for (AppointmentEntity appointmentEntity : allByUserId) {
            appointments.add(modelMapper.map(appointmentEntity, Appointment.class));
        }
        return appointments;
    }
}
