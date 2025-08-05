package edu.icet.repository;

import edu.icet.entity.DoctorEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface DoctorRepository extends JpaRepository<DoctorEntity, Integer> {

    @Query(value = "SELECT doctor_id FROM doctor WHERE user_id = ?1", nativeQuery = true)
    int findDoctorIdByUserId(int userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM doctor WHERE user_id = ?1", nativeQuery = true)
    void deleteDoctorByUserId(int userId);
}
