package edu.icet.service.impl.patientService;

import edu.icet.dto.Patient;
import edu.icet.dto.PatientHealthData;
import edu.icet.dto.User;
import edu.icet.repository.PatientHealthDataRepository;
import edu.icet.repository.PatientRepository;
import edu.icet.repository.UserRepository;
import edu.icet.service.interfaces.patientInterfaces.PatientDashboardService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientDashboardServiceImpl implements PatientDashboardService {

    private final ModelMapper modelMapper;
    private final PatientRepository patientRepository;
    private final PatientHealthDataRepository patientHealthDataRepository;
    private final UserRepository userRepository;

    @Override
    public PatientHealthData getHealthStats(int id) {
        try {
            return modelMapper.map(patientHealthDataRepository.findLatestByUserId(id), PatientHealthData.class);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public User getUser(int id) {
        try {
            return modelMapper.map(userRepository.findById(id).get(), User.class);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Patient getUserInfo(int id) {
        try {
            return modelMapper.map(patientRepository.findById(id).get(), Patient.class);
        } catch (Exception e) {
            return null;
        }
    }
}
