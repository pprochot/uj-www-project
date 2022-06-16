package uj.pprochot.www.backend.dto;

import java.time.LocalDate;

public record HouseworkResponseDto(
        Long id,
        String name,
        String description,
        Long apartmentId,
        String executorMail,
        LocalDate completionDate) {
}
