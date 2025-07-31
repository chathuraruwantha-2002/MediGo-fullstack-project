package edu.icet.repository;

import edu.icet.entity.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {

    @Query(value = "SELECT * FROM appointment WHERE patient_id = ?1", nativeQuery = true)
    List<AppointmentEntity> findAllByUserId(int id);

    @Query(value = "SELECT * FROM appointment WHERE doctor_id = ?1", nativeQuery = true)
    List<AppointmentEntity> findAllByDoctorId(int id);




}
