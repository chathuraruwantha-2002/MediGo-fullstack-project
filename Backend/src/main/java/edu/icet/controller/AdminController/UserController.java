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

}
