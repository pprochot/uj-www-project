package uj.pprochot.www.backend.dto;

public record HouseworkResponseDto(
        Long id,
        String name,
        String description,
        Long apartmentId,
        String executorMail,
        Long completionDate) {
}
