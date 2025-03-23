package edu.icet.controller.PatientController;

import edu.icet.dto.Patient;
import edu.icet.dto.PatientHealthData;
import edu.icet.dto.User;
import edu.icet.service.interfaces.patientInterfaces.PatientDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient/dashboard")
@RequiredArgsConstructor
@CrossOrigin
public class PatientDashboardController {

    private final PatientDashboardService service;

    @GetMapping("/get-health-stats/{id}")
    public PatientHealthData getHealthStats(@PathVariable int id) {
        return service.getHealthStats(id);
    }

    @GetMapping("/get-user/{id}")
    public User getUser(@PathVariable int id) {
        return service.getUser(id);
    }

    @GetMapping("/get-user-info/{id}")
    public Patient getUserInfo(@PathVariable int id) {
        return service.getUserInfo(id);
    }
}
