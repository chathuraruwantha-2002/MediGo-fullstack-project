package edu.icet.controller.DoctorController;

import edu.icet.dto.*;
import edu.icet.service.interfaces.doctorInterfaces.DoctorDashboardService;
import edu.icet.service.interfaces.patientInterfaces.PatientDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor/dashboard")
@RequiredArgsConstructor
@CrossOrigin
public class DoctorDashboardController {

    private final DoctorDashboardService service;
    @GetMapping("/get-user/{id}")
    public User getUser(@PathVariable int id) {
        return service.getUser(id);
    }

    @GetMapping("/get-user-info/{id}")
    public Doctor getUserInfo(@PathVariable int id) {
        return service.getUserInfo(id);
    }

    @GetMapping("/get-doctor-stats/{id}")
    public DoctorStat getDoctorStats(@PathVariable int id) {
        return service.getDoctorStats(id);
    }
}
