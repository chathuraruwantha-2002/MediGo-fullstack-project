package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Feedback {
    private int feedbackId;
    private String feedbackType;
    private String feedback;
    private int rating;
    private String dateTimeStats;
    private int userId;
    private int doctorId;
}
