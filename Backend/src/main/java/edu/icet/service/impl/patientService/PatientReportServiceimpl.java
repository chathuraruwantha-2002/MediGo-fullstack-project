package edu.icet.service.impl.patientService;

import edu.icet.dto.Doctor;
import edu.icet.dto.Hospital;
import edu.icet.dto.Medication;
import edu.icet.dto.Report;
import edu.icet.entity.DoctorEntity;
import edu.icet.entity.HospitalEntity;
import edu.icet.entity.MedicationEntity;
import edu.icet.entity.ReportEntity;
import edu.icet.repository.DoctorRepository;
import edu.icet.repository.HospitalRepository;
import edu.icet.repository.MedicationRepository;
import edu.icet.repository.ReportRepository;
import edu.icet.service.interfaces.patientInterfaces.PatientFindService;
import edu.icet.service.interfaces.patientInterfaces.PatientReportService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientReportServiceimpl implements PatientReportService {

    private final ReportRepository reportRepository;
    private final MedicationRepository medicationRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<Report> getAllReports(int id) {
        List<Report> reportList = new ArrayList<>();
        List<ReportEntity> all = reportRepository.findAllByPatientId(id);

        for (ReportEntity reportEntity : all) {
            reportList.add(modelMapper.map(reportEntity, Report.class));
        }
        return reportList;
    }

    @Override
    public List<Medication> getAllPrescriptions(int id) {
        List<Medication> medicationList = new ArrayList<>();
        List<MedicationEntity> all = medicationRepository.findAllByPatientId(id);

        for(MedicationEntity medicationEntity : all){
            medicationList.add(modelMapper.map(medicationEntity, Medication.class));
        }

        return medicationList;
    }


}
