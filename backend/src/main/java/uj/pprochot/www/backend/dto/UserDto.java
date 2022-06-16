package uj.pprochot.www.backend.dto;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public record UserDto(
        @NotNull @NotEmpty String email,
        @NotNull @NotEmpty String password,
        String matchingPassword) {
}