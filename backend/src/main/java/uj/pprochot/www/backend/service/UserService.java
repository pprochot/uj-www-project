package uj.pprochot.www.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uj.pprochot.www.backend.dto.UserDto;
import uj.pprochot.www.backend.dto.UserRole;
import uj.pprochot.www.backend.exception.UserAlreadyExistException;
import uj.pprochot.www.backend.ri.entity.User;
import uj.pprochot.www.backend.ri.repository.UserRepository;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerAdmin(UserDto userDto) {
        saveUser(userDto, UserRole.ADMIN);
    }

    public void registerUser(UserDto userDto) {
        saveUser(userDto, UserRole.USER);
    }

    private void saveUser(UserDto userDto, UserRole role) {
        if (emailExist(userDto.email())) {
            throw new UserAlreadyExistException("There is an account with that email address: "
                    + userDto.email());
        }

        var user = new User();
        user.setEncodedPassword(passwordEncoder.encode(userDto.password()));
        user.setEmail(userDto.email());
        user.setRole(role);

        userRepository.save(user);
    }

    private boolean emailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
