package edu.icet.repository;

import edu.icet.entity.MedicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicationRepository extends JpaRepository<MedicationEntity, Integer> {
    @Query(value = "SELECT * FROM medication WHERE patient_id = ?1", nativeQuery = true)
    List<MedicationEntity> findAllByPatientId(int id);
}
