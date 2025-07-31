package edu.icet.service.impl.doctorService;

import edu.icet.dto.*;
import edu.icet.entity.DoctorStatEntity;
import edu.icet.repository.*;
import edu.icet.service.interfaces.doctorInterfaces.DoctorDashboardService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorDashboardServiceImpl implements DoctorDashboardService {

    private final ModelMapper modelMapper;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final DoctorStatRepository doctorStatRepository;
    @Override
    public User getUser(int id) {
        try {
            return modelMapper.map(userRepository.findById(id).get(), User.class);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Doctor getUserInfo(int id) {
        try {
            return modelMapper.map(doctorRepository.findById(id).get(), Doctor.class);
        } catch (Exception e) {
            return null;
        }
    }

    public DoctorStat getDoctorStats(int id) {
        try {
            DoctorStatEntity entity = doctorStatRepository.findByDoctorId(id);
            if (entity == null) return null;

            DoctorStat dto = modelMapper.map(entity, DoctorStat.class);
            dto.setLinkedDoctorId(entity.getDoctor().getDoctorId()); //manual mapping
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
