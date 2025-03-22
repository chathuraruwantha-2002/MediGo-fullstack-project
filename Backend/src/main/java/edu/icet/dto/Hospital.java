package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Hospital {
    private int hospitalId;
    private String name;
    private String location;
    private String phone;
    private String email;
    private String description;
}
