package edu.icet.controller.PatientController;

import edu.icet.dto.Appointment;

import edu.icet.service.interfaces.patientInterfaces.PatientAppointmentService;
import lombok.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient/appointment")
@RequiredArgsConstructor
@CrossOrigin
public class AppointmentController {

    private final PatientAppointmentService service;

    @GetMapping("/get-all/{id}")
    public List<Appointment> getAll(@PathVariable int id) {
        return service.getAll(id);
    }

    @GetMapping("/get-all-doctors")
    public List<String> getAllDoctors() {
        return service.getAllDoctors();
    }

}
