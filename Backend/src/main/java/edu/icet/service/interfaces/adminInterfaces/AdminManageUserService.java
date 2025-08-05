package edu.icet.service.interfaces.adminInterfaces;

import edu.icet.dto.Doctor;
import edu.icet.dto.Patient;
import edu.icet.dto.User;

import java.util.List;

public interface AdminManageUserService {

    List<User> getAll();

    String addUser(User user);

    String updateUser(User user);

    String deleteUser(int id);

    String addPatient(Patient patient);

    String addDoctor(Doctor doctor);

    String addAdmin(User user);
}
