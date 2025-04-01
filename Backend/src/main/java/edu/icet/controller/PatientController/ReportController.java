package edu.icet.controller.PatientController;

import edu.icet.dto.Medication;
import edu.icet.dto.Report;
import edu.icet.service.interfaces.patientInterfaces.PatientReportService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/patient/report")
@CrossOrigin
public class ReportController {
    private final PatientReportService service;

    @GetMapping("/get-all-reports/{id}")
    public List<Report> getAllReports(@PathVariable int id) {
        return service.getAllReports(id);
    }

    @GetMapping("/get-all-prescriptions/{id}")
    public List<Medication> getAllPrescriptions(@PathVariable int id) {
        return service.getAllPrescriptions(id);
    }


}
