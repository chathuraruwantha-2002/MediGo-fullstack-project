package edu.icet.repository;

import edu.icet.entity.PatientHealthDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientHealthDataRepository extends JpaRepository<PatientHealthDataEntity, Integer> {

    @Query(value = "SELECT * FROM patient_health_data WHERE user_id = ?1 ORDER BY date_time_stats DESC LIMIT 1", nativeQuery = true)
    PatientHealthDataEntity findLatestByUserId(int id);

}
