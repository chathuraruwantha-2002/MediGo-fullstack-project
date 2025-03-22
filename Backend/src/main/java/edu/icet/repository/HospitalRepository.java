package edu.icet.repository;

import edu.icet.entity.HospitalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepository extends JpaRepository<HospitalEntity, Integer> {
}
