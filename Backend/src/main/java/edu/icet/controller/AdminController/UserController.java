package edu.icet.controller.AdminController;


import edu.icet.service.interfaces.adminInterfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;


    //get user for login purpose "return Role and userId"
    @GetMapping("/login-user")
    public List<String> loginUser(@RequestParam String username, @RequestParam String password) {
        return userService.validateUser(username, password);

    }

    //get doctorId from UserId
    @GetMapping("/get-doctor-id/{id}")
    public int getDoctorId(@PathVariable int id) {
        return userService.getDoctorId(id);
    }

    //get patientId from UserId
    @GetMapping("/get-patient-id/{id}")
    public int getPatientId(@PathVariable int id) {
        return userService.getPatientId(id);
    }

    //get adminId from UserId
    @GetMapping("/get-admin-id/{id}")
    public int getAdminId(@PathVariable int id) {
        return userService.getAdminId(id);
    }

}
