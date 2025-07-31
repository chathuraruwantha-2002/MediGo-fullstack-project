package edu.icet.service.interfaces.doctorInterfaces;

import edu.icet.dto.*;

public interface DoctorDashboardService {
    
    User getUser(int id);

    Doctor getUserInfo(int id);

    DoctorStat getDoctorStats(int id);
}
