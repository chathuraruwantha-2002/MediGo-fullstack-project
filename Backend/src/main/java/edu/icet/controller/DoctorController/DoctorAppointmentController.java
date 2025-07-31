package edu.icet.controller.DoctorController;

import edu.icet.dto.Appointment;
import edu.icet.service.interfaces.doctorInterfaces.DoctorAppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor/appointment")
@RequiredArgsConstructor
@CrossOrigin
public class DoctorAppointmentController {

    private final DoctorAppointmentService service;

    //get all
    @GetMapping("/get-all/{id}")
    public List<Appointment> getAll(@PathVariable int id) {
        return service.getAll(id);
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
        return service.addAppointment(appointment);
        //return "Success";
    }


    //delete appointment
    @DeleteMapping("/delete-appointment/{id}")
    public String deleteAppointment(@PathVariable int id) {
        return service.deleteAppointment(id);
        //return "Success";
    }


}
