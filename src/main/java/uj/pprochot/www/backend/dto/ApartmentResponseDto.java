package uj.pprochot.www.backend.dto;

import java.util.List;

public record ApartmentResponseDto(
        Long id,
        String name,
        String address,
        String creator,
        List<String> roommatesMails) {
}
