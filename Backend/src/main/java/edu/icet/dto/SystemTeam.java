package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SystemTeam {
    private int teamMemberId;
    private String name;
    private String phone;
    private String email;
    private String gender;
    private String role;
    private int userId;
}
