package edu.icet.service.interfaces.adminInterfaces;

import java.util.List;

public interface UserService {
    List<String> validateUser(String username, String password);

    int getDoctorId(int id);

    int getPatientId(int id);

    int getAdminId(int id);
}
