package edu.icet.service.impl.adminService;

import edu.icet.dto.Doctor;
import edu.icet.dto.Patient;
import edu.icet.dto.User;
import edu.icet.entity.DoctorEntity;
import edu.icet.entity.PatientEntity;
import edu.icet.entity.UserEntity;
import edu.icet.repository.AppointmentRepository;
import edu.icet.repository.DoctorRepository;
import edu.icet.repository.PatientRepository;
import edu.icet.repository.UserRepository;
import edu.icet.service.interfaces.adminInterfaces.AdminManageUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminManageUserServiceImpl implements AdminManageUserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    @Override
    public List<User> getAll() {
        List<User> users = new ArrayList<>();
        List<UserEntity> userEntities = userRepository.findAll();

        for (UserEntity userEntity : userEntities) {
            users.add(modelMapper.map(userEntity, User.class));
        }

        return users;
    }


    @Override
    public String addUser(User user) {
        userRepository.save(modelMapper.map(user, UserEntity.class));
        return "Success";
    }
    @Override
    public String addPatient(Patient patient) {
        patientRepository.save(modelMapper.map(patient, PatientEntity.class));
        return "Success";
    }

    @Override
    public String addDoctor(Doctor doctor) {
        doctorRepository.save(modelMapper.map(doctor, DoctorEntity.class));
        return "Success";
    }

    @Override
    public String addAdmin(User user) {
        return null;
    }




    @Override
    public String updateUser(User user) {
        userRepository.save(modelMapper.map(user, UserEntity.class));
        return "Success";
    }

    @Override
    @Transactional
    public String deleteUser(int id, String role) {
        if (role.equalsIgnoreCase("patient")) {
            patientRepository.deletePatientByUserId(id);
        } else if (role.equalsIgnoreCase("doctor")) {
            doctorRepository.deleteDoctorByUserId(id);
        }

        userRepository.deleteById(id);
        return "Success";
    }

    public User getUserByEmail(String email) {
        return modelMapper.map(userRepository.findByEmail(email), User.class);
    }

}
