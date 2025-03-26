package edu.icet.service.interfaces.patientInterfaces;

import edu.icet.dto.Doctor;
import edu.icet.dto.Hospital;

import java.util.List;

public interface PatientFindService {
    List<Doctor> getAllDoctors();

    List<Hospital> getAllHospitals();
}
