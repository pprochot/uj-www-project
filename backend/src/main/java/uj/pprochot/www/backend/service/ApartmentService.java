package uj.pprochot.www.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uj.pprochot.www.backend.dto.ApartmentDto;
import uj.pprochot.www.backend.dto.ApartmentResponseDto;
import uj.pprochot.www.backend.ri.entity.Apartment;
import uj.pprochot.www.backend.ri.entity.User;
import uj.pprochot.www.backend.ri.repository.ApartmentRepository;
import uj.pprochot.www.backend.ri.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApartmentService {

    private final UserRepository userRepository;
    private final ApartmentRepository apartmentRepository;

    public ApartmentResponseDto createApartment(String creatorMail, ApartmentDto apartmentDto) {
        var creator = userRepository.findByEmail(creatorMail);
        if (creator.isEmpty()) {
            throw new UsernameNotFoundException("No user found with username: " + creatorMail);
        }

        List<Optional<User>> users = apartmentDto.roommatesMails().stream()
                .map(userRepository::findByEmail)
                .toList();

        List<User> foundUsers = users.stream()
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

        if (apartmentDto.roommatesMails().size() != foundUsers.size()) {
            List<String> mails = new ArrayList<>(apartmentDto.roommatesMails());
            mails.removeAll(foundUsers.stream().map(User::getEmail).toList());
            throw new UsernameNotFoundException("No users found with username: " + mails);
        }

        var apartment = new Apartment();
        apartment.setCreator(creator.get());
        apartment.setName(apartmentDto.name());
        apartment.setAddress(apartmentDto.address());
        apartment.setRoommates(foundUsers);

        Apartment createdApartment = apartmentRepository.save(apartment);
        return new ApartmentResponseDto(
                createdApartment.getApartmentId(),
                createdApartment.getName(),
                createdApartment.getAddress(),
                createdApartment.getCreator().getEmail(),
                createdApartment.getRoommates().stream().map(User::getEmail).toList()
        );
    }

    public List<ApartmentResponseDto> getUserApartments(String userMail) {
        var user = userRepository.findByEmail(userMail);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("No user found with username: " + userMail);
        }
        return apartmentRepository.findApartmentsByCreator(user.get())
                .stream()
                .map(apartment -> new ApartmentResponseDto(
                        apartment.getApartmentId(),
                        apartment.getName(),
                        apartment.getAddress(),
                        apartment.getCreator().getEmail(),
                        apartment.getRoommates().stream().map(User::getEmail).toList()
                )).toList();
    }
}
