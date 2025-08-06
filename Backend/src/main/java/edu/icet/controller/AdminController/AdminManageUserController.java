package edu.icet.controller.AdminController;


import edu.icet.dto.Doctor;
import edu.icet.dto.Patient;
import edu.icet.dto.User;
import edu.icet.service.interfaces.adminInterfaces.AdminManageUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/manage-user")
@RequiredArgsConstructor
public class AdminManageUserController {

    private final AdminManageUserService service;
    // get all
    @GetMapping("/get-all")
    public List<User> getAll() {
        return service.getAll();
    }

    @GetMapping("/get-user-by-email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return service.getUserByEmail(email);
    }

    // add user
    @PostMapping("/add-user")
    public String addUser(@RequestBody User user) {
        return service.addUser(user);
    }
    //add patient
    @PostMapping("/add-patient")
    public String addPatient(@RequestBody Patient patient) {
        return service.addPatient(patient);
    }
    //add doctor
    @PostMapping("/add-doctor")
    public String addDoctor(@RequestBody Doctor doctor) {
        return service.addDoctor(doctor);
    }
    //add admin
    @PostMapping("/add-admin")
    public String addAdmin(@RequestBody User user) {
        return service.addAdmin(user);
    }




    // update user
    @PutMapping("/update-user")
    public String updateUser(@RequestBody User user) {
        return service.updateUser(user);
    }
    // delete user
    @DeleteMapping("/delete-user/{id}/{role}")
    public String deleteUser(@PathVariable int id ,@PathVariable String role) {
        return service.deleteUser(id,role);
    }
}
