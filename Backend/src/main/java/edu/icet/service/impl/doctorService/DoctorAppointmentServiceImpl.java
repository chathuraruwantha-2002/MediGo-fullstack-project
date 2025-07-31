package edu.icet.service.impl.doctorService;

import edu.icet.dto.Appointment;
import edu.icet.entity.AppointmentEntity;
import edu.icet.entity.DoctorEntity;
import edu.icet.repository.AppointmentRepository;
import edu.icet.repository.DoctorRepository;
import edu.icet.service.interfaces.doctorInterfaces.DoctorAppointmentService;
import edu.icet.service.interfaces.patientInterfaces.PatientAppointmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorAppointmentServiceImpl implements DoctorAppointmentService {

    private final ModelMapper modelMapper;
    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    @Override
    public List<Appointment> getAll(int id) {
        List<Appointment> appointments = new ArrayList<>();
        List<AppointmentEntity> allByDoctorId = appointmentRepository.findAllByDoctorId(id);

        for (AppointmentEntity appointmentEntity : allByDoctorId) {
            appointments.add(modelMapper.map(appointmentEntity, Appointment.class));
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
