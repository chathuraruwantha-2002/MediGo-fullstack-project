package edu.icet.controller.PatientController;

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

    @GetMapping("/get-all/{id}")
    public List<Report> getAll(@PathVariable int id) {
        return service.getAll(id);
    }


}
