package edu.icet.repository;

import edu.icet.entity.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientRepository extends JpaRepository<PatientEntity, Integer> {

    @Query(value = "SELECT patient_id FROM patient WHERE user_id = ?1", nativeQuery = true)
    int findPatientIdByUserId(int userId);
}
