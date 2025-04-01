package edu.icet.service.interfaces.patientInterfaces;

import edu.icet.dto.*;

import java.util.List;

public interface PatientReportService {
    List<Report> getAllReports(int id);

    List<Medication> getAllPrescriptions(int id);
}
