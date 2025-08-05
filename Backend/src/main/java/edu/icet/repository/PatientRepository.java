package edu.icet.repository;

import edu.icet.entity.PatientEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PatientRepository extends JpaRepository<PatientEntity, Integer> {

    @Query(value = "SELECT patient_id FROM patient WHERE user_id = ?1", nativeQuery = true)
    int findPatientIdByUserId(int userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM patient WHERE user_id = ?1", nativeQuery = true)
    void deletePatientByUserId(int userId);
}
