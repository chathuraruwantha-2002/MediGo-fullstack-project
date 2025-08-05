package edu.icet.service.interfaces.adminInterfaces;

import java.util.List;

public interface AdminDashboardService {
    List<String> getTotalUsers();

    List<String> getTotalAppointments();
}
