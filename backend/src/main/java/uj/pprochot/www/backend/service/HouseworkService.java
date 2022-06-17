package uj.pprochot.www.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uj.pprochot.www.backend.dto.HouseworkDto;
import uj.pprochot.www.backend.dto.HouseworkResponseDto;
import uj.pprochot.www.backend.exception.NotFoundException;
import uj.pprochot.www.backend.ri.entity.Apartment;
import uj.pprochot.www.backend.ri.entity.Housework;
import uj.pprochot.www.backend.ri.repository.ApartmentRepository;
import uj.pprochot.www.backend.ri.repository.HouseworkRepository;
import uj.pprochot.www.backend.ri.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HouseworkService {

    private final UserRepository userRepository;
    private final ApartmentRepository apartmentRepository;
    private final HouseworkRepository houseworkRepository;

    public HouseworkResponseDto createHousework(HouseworkDto houseworkDto) {
        var optionalApartment = apartmentRepository.findById(houseworkDto.apartmentId());
        if (optionalApartment.isEmpty()) {
            throw new NotFoundException("Not found apartment with id: " + houseworkDto.apartmentId());
        }
        var apartment = optionalApartment.get();

        if (!belongsToApartment(houseworkDto.executorMail(), apartment)) {
            throw new NotFoundException("User does not belong to apartment: " + houseworkDto.executorMail());
        }
        var executor = userRepository.findByEmail(houseworkDto.executorMail()).get();

        var housework = new Housework();
        housework.setApartment(apartment);
        housework.setExecutor(executor);
        housework.setName(houseworkDto.name());
        housework.setDescription(houseworkDto.description());

        var savedHousework = houseworkRepository.save(housework);

        return new HouseworkResponseDto(
                savedHousework.getHouseworkId(),
                savedHousework.getName(),
                savedHousework.getDescription(),
                savedHousework.getApartment().getApartmentId(),
                savedHousework.getExecutor().getEmail(),
                Optional.ofNullable(savedHousework.getCompletionDate())
                        .map(a -> a.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1_000)
                        .orElse(null)
        );
    }

    public List<HouseworkResponseDto> getUserHousework(String userMail) {
        return houseworkRepository.findAllByExecutorEmail(userMail).stream()
                .map(housework -> new HouseworkResponseDto(
                        housework.getHouseworkId(),
                        housework.getName(),
                        housework.getDescription(),
                        housework.getApartment().getApartmentId(),
                        housework.getExecutor().getEmail(),
                        Optional.ofNullable(housework.getCompletionDate())
                                .map(a -> a.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1_000)
                                .orElse(null)
                )).toList();
    }

    public HouseworkResponseDto completeHousework(String mail, long houseworkId) {
        var optionalHousework = houseworkRepository.findById(houseworkId);
        if (optionalHousework.isEmpty()) {
            throw new NotFoundException("Not found apartment with id: " + houseworkId);
        }

        var housework = optionalHousework.get();
        if (housework.getCompletionDate() != null) {
            throw new NotFoundException("Housework is already completed!");
        }
        if (!housework.getExecutor().getEmail().equalsIgnoreCase(mail)) {
            throw new NotFoundException("You are not an executor of this housework!");
        }

        housework.setCompletionDate(LocalDate.now());
        houseworkRepository.save(housework);
        return new HouseworkResponseDto(
                housework.getHouseworkId(),
                housework.getName(),
                housework.getDescription(),
                housework.getApartment().getApartmentId(),
                housework.getExecutor().getEmail(),
                Optional.ofNullable(housework.getCompletionDate())
                        .map(a -> a.toEpochSecond(LocalTime.MIDNIGHT, ZoneOffset.UTC) * 1_000)
                        .orElse(null)
        );
    }

    private boolean belongsToApartment(String email, Apartment apartment) {
        return apartment.getCreator().getEmail().equalsIgnoreCase(email) ||
                apartment.getRoommates().stream().map(u -> u.getEmail().toLowerCase()).toList()
                        .contains(email.toLowerCase());

    }
}
