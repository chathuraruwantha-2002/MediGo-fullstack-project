package edu.icet.service.interfaces.patientInterfaces;

import edu.icet.dto.Patient;
import edu.icet.dto.PatientHealthData;
import edu.icet.dto.Report;
import edu.icet.dto.User;

import java.util.List;

public interface PatientReportService {
    List<Report> getAll(int id);
}
