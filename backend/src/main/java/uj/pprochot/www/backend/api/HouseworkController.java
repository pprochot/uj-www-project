package uj.pprochot.www.backend.api;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import uj.pprochot.www.backend.dto.HouseworkDto;
import uj.pprochot.www.backend.dto.HouseworkResponseDto;
import uj.pprochot.www.backend.service.HouseworkService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class HouseworkController {

    private final HouseworkService houseworkService;

    @PostMapping("/housework")
    public HouseworkResponseDto createHousework(@RequestBody @Valid HouseworkDto houseworkDto) {
        return houseworkService.createHousework(houseworkDto);
    }

    @GetMapping("/housework")
    public List<HouseworkResponseDto> getUserHousework(Authentication authentication) {
        return houseworkService.getUserHousework(authentication.getName());
    }

    @PatchMapping("/housework/{houseworkId}")
    public HouseworkResponseDto setHouseworkAsCompleted(Authentication authentication,
                                                        @PathVariable("houseworkId") Long houseworkId) {
        return houseworkService.completeHousework(authentication.getName(), houseworkId);
    }
}
