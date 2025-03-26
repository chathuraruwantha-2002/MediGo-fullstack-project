package edu.icet.controller.PatientController;

import edu.icet.dto.Doctor;
import edu.icet.dto.Hospital;
import edu.icet.service.interfaces.patientInterfaces.PatientAppointmentService;
import edu.icet.service.interfaces.patientInterfaces.PatientFindService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patient/doctor")
@CrossOrigin
public class FindController {

    private final PatientFindService service;

    @GetMapping("/get-all-doctors")
    public List<Doctor> getAllDoctors() {
        return service.getAllDoctors();
    }

    @GetMapping("/get-all-hospitals")
    public List<Hospital> getAllHospitals() {
        return service.getAllHospitals();
    }
}
