package edu.icet.repository;

import edu.icet.entity.MedicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationRepository extends JpaRepository<MedicationEntity, Integer> {
}
