package uj.pprochot.www.backend.validator;

import org.springframework.stereotype.Component;
import uj.pprochot.www.backend.dto.UserDto;

import java.util.Objects;

@Component
public class PasswordValidator implements Validator<UserDto> {

    @Override
    public boolean isValid(UserDto user){
        return Objects.equals(user.password(), user.matchingPassword());
    }
}
