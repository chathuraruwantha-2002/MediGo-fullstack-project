package edu.icet.service.impl.patientService;

import edu.icet.dto.Appointment;
import edu.icet.entity.AppointmentEntity;
import edu.icet.entity.DoctorEntity;
import edu.icet.repository.AppointmentRepository;
import edu.icet.repository.DoctorRepository;
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
    private final DoctorRepository doctorRepository;
    @Override
    public List<Appointment> getAll(int id) {
        List<Appointment> appointments = new ArrayList<>();
        List<AppointmentEntity> allByUserId = appointmentRepository.findAllByUserId(id);

        for (AppointmentEntity appointmentEntity : allByUserId) {
            appointments.add(modelMapper.map(appointmentEntity, Appointment.class));
        }
        return appointments;
    }

    @Override
    public List<String> getAllDoctors() {
        List<String> doctors = new ArrayList<>();
        List<DoctorEntity> all = doctorRepository.findAll();
        for (DoctorEntity doctorEntity : all) {
            doctors.add(doctorEntity.getName());
        }
        return doctors;
    }

    @Override
    public String addAppointment(Appointment appointment) {
        appointmentRepository.save(modelMapper.map(appointment, AppointmentEntity.class));
        return "Success";
    }
}
