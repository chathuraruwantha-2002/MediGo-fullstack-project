package edu.icet.repository;

import edu.icet.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    @Query(value = "SELECT role, user_id FROM user WHERE email = ?1 AND password = ?2", nativeQuery = true)
    List<Object[]> findUserRoleAndIdByEmailAndPassword(String email, String password);

    @Query(value = "SELECT role, COUNT(*) FROM user GROUP BY role", nativeQuery = true)
    List<Object[]> findAllSeparateCounts();

}
