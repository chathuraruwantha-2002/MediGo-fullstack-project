package edu.icet.repository;

import edu.icet.entity.PatientHealthDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientHealthDataRepository extends JpaRepository<PatientHealthDataEntity, Integer> {
}
