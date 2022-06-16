package uj.pprochot.www.backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public record ApartmentDto(
        @NotNull @NotEmpty String name,
        @NotNull @NotEmpty String address,
        @NotNull @NotEmpty List<String> roommatesMails) {
}
