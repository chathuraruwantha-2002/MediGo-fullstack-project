package edu.icet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "system_team")
public class SystemTeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamMemberId;
    private String name;
    private String phone;
    private String email;
    private String gender;
    private String role;
    private int userId;
}
