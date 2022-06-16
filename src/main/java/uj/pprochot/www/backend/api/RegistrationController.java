package uj.pprochot.www.backend.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import uj.pprochot.www.backend.dto.UserDto;
import uj.pprochot.www.backend.service.UserService;
import uj.pprochot.www.backend.validator.EmailValidator;
import uj.pprochot.www.backend.validator.PasswordValidator;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class RegistrationController {

    private final EmailValidator emailValidator;
    private final PasswordValidator passwordValidator;
    private final UserService userService;

    @PostMapping("/register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody @Valid UserDto userDto) {
        if (!emailValidator.isValid(userDto.email())) {
            return ResponseEntity.badRequest().body("Invalid email!");
        }
        if (!passwordValidator.isValid(userDto)) {
            return ResponseEntity.badRequest().body("Invalid passwords!");
        }

        userService.registerAdmin(userDto);
        return ResponseEntity.ok().body("Success");
    }

    @PostMapping("/register/user")
    public ResponseEntity<String> registerUser(@RequestBody @Valid UserDto userDto) {
        if (!emailValidator.isValid(userDto.email())) {
            return ResponseEntity.badRequest().body("Invalid email!");
        }
        if (!passwordValidator.isValid(userDto)) {
            return ResponseEntity.badRequest().body("Invalid passwords!");
        }

        userService.registerUser(userDto);
        return ResponseEntity.ok().body("Success");
    }

}
