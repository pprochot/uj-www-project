package uj.pprochot.www.backend.api;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import uj.pprochot.www.backend.dto.ApartmentDto;
import uj.pprochot.www.backend.dto.ApartmentResponseDto;
import uj.pprochot.www.backend.dto.HouseworkDto;
import uj.pprochot.www.backend.service.ApartmentService;
import uj.pprochot.www.backend.service.HouseworkService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ApartmentController {

    private final ApartmentService apartmentService;
    private final HouseworkService houseworkService;

    @PostMapping("/apartment")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApartmentResponseDto createApartment(
            @RequestHeader("Authorization") String myNumber, Authentication authentication, @RequestBody @Valid ApartmentDto apartment) {
        return apartmentService.createApartment(authentication.getName(), apartment);
    }

    @GetMapping("/apartment")
    public List<ApartmentResponseDto> getUserApartments(Authentication authentication) {
        return apartmentService.getUserApartments(authentication.getName());
    }
}
