package edu.icet.service.impl.patientService;

import edu.icet.dto.Doctor;
import edu.icet.dto.Hospital;
import edu.icet.entity.DoctorEntity;
import edu.icet.entity.HospitalEntity;
import edu.icet.repository.DoctorRepository;
import edu.icet.repository.HospitalRepository;
import edu.icet.service.interfaces.patientInterfaces.PatientFindService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientFindServiceimpl implements PatientFindService {

    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<Doctor> getAllDoctors() {
        List<Doctor> doctorList = new ArrayList<>();
        List<DoctorEntity> all = doctorRepository.findAll();

        for (DoctorEntity doctorEntity : all) {
            doctorList.add(modelMapper.map(doctorEntity, Doctor.class));
        }
        return doctorList;
    }

    @Override
    public List<Hospital> getAllHospitals() {
        List<Hospital> hospitalList = new ArrayList<>();
        List<HospitalEntity> all = hospitalRepository.findAll();

        for(HospitalEntity hospitalEntity : all) {
            hospitalList.add(modelMapper.map(hospitalEntity, Hospital.class));
        }
        return hospitalList;
    }
}
