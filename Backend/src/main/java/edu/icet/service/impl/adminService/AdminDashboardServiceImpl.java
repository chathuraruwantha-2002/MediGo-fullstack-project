package edu.icet.service.impl.adminService;

import edu.icet.repository.AppointmentRepository;
import edu.icet.repository.UserRepository;
import edu.icet.service.interfaces.adminInterfaces.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    @Override
    public List<String> getTotalUsers() {
        List<Object[]> results = userRepository.findAllSeparateCounts();
        List<String> roleCounts = new ArrayList<>();

        for (Object[] row : results) {
            String role = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            roleCounts.add(role + ": " + count);
        }

        return roleCounts;
    }


    @Override
    public List<String> getTotalAppointments() {
        List<Object[]> results = appointmentRepository.findAllSeparateCounts();
        List<String> roleCounts = new ArrayList<>();

        for (Object[] row : results) {
            String role = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            roleCounts.add(role + ": " + count);
        }

        return roleCounts;
    }
}
