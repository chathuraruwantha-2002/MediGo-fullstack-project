package edu.icet.service.interfaces.patientInterfaces;

import edu.icet.dto.Patient;
import edu.icet.dto.PatientHealthData;
import edu.icet.dto.User;

public interface PatientDashboardService {
    PatientHealthData getHealthStats(int id);

    User getUser(int id);

    Patient getUserInfo(int id);
}
