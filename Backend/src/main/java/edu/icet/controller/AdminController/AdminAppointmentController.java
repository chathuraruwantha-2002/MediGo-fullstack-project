package edu.icet.controller.AdminController;


import edu.icet.dto.Appointment;
import edu.icet.service.interfaces.adminInterfaces.AdminAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/appointment")
@CrossOrigin
@RequiredArgsConstructor
public class AdminAppointmentController {

    private final AdminAppointmentService service;

    //get all
    @GetMapping("/get-all")
    public List<Appointment> getAll() {
        return service.getAll();
    }


    //add appointment
    @PostMapping("/add-appointment")
    public String addAppointment(@RequestBody Appointment appointment) {
        return service.addAppointment(appointment);
        //return "Success";
    }



    //update appointment
    @PutMapping("/update-appointment")
    public String updateAppointment(@RequestBody Appointment appointment) {
        return service.updateAppointment(appointment);
        //return "Success";
    }


    //delete appointment
    @DeleteMapping("/delete-appointment/{id}")
    public String deleteAppointment(@PathVariable int id) {
        return service.deleteAppointment(id);
        //return "Success";
    }

}
