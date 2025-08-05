package edu.icet.controller.AdminController;
import edu.icet.service.interfaces.adminInterfaces.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService service;


    //total users with doctors,admin,patients
    @GetMapping("/get-total-users")
    public List<String> getTotalUsers() {
        return service.getTotalUsers();
    }

    //total appointments
    @GetMapping("/get-total-appointments")
    public List<String> getTotalAppointments() {
        return service.getTotalAppointments();
    }
    //revenue
    //new signups
}
