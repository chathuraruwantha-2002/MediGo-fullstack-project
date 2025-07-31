package edu.icet.repository;


import edu.icet.entity.DoctorStatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DoctorStatRepository extends JpaRepository<DoctorStatEntity, Integer> {
    @Query("SELECT d FROM DoctorStatEntity d WHERE d.doctor.doctorId = ?1")
    DoctorStatEntity findByDoctorId(int id);
}
