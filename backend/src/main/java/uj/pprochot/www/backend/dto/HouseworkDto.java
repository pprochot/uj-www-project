package uj.pprochot.www.backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public record HouseworkDto(
        @NotNull @NotEmpty String name,
        @NotNull @NotEmpty String description,
        @NotNull Long apartmentId,
        @NotNull @NotEmpty String executorMail) {
}
