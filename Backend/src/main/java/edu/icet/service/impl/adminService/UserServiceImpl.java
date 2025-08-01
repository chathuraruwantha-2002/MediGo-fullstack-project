package edu.icet.service.impl.adminService;

import edu.icet.dto.User;
import edu.icet.repository.AppointmentRepository;
import edu.icet.repository.DoctorRepository;
import edu.icet.repository.PatientRepository;
import edu.icet.repository.UserRepository;
import edu.icet.service.interfaces.adminInterfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;


    @Override
    public List<String> validateUser(String username, String password) {
        List<Object[]> results = userRepository.findUserRoleAndIdByEmailAndPassword(username, password);

        if (!results.isEmpty()) {
            Object[] row = results.get(0);
            String role = (String) row[0];
            Integer userId = null;
            if (row[1] instanceof Integer) {
                userId = (Integer) row[1];
            } else if (row[1] instanceof Number) {
                userId = ((Number) row[1]).intValue();
            } else {
                throw new IllegalStateException("Unexpected type for userId: " + row[1].getClass());
            }

            return List.of(role, String.valueOf(userId));
        } else {
            return List.of("INVALID");
        }
    }

    @Override
    public int getDoctorId(int userId) {
        return doctorRepository.findDoctorIdByUserId(userId);
    }

    @Override
    public int getPatientId(int userId) {
        return patientRepository.findPatientIdByUserId(userId);
    }
}
