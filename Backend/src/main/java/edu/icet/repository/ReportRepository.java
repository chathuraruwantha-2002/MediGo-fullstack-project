package edu.icet.repository;

import edu.icet.entity.AppointmentEntity;
import edu.icet.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepository extends JpaRepository<ReportEntity, Integer> {

    @Query(value = "SELECT * FROM report WHERE patient_id = ?1", nativeQuery = true)
    List<ReportEntity> findAllByPatientId(int id);


}
