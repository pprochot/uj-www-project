package uj.pprochot.www.backend.api;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import uj.pprochot.www.backend.ri.entity.User;
import uj.pprochot.www.backend.ri.repository.UserRepository;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/user")
    public Page<String> getUsers(Pageable pageRequest) {
        Page<User> page = userRepository.findAll(pageRequest);
        List<String> emails = page.stream()
                .map(User::getEmail)
                .toList();
        return new PageImpl<>(emails, pageRequest, page.getTotalPages());
    }
}
