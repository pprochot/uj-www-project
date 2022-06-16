package uj.pprochot.www.backend.ri.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import uj.pprochot.www.backend.ri.entity.Apartment;
import uj.pprochot.www.backend.ri.entity.User;

import java.util.List;

@Component
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    List<Apartment> findApartmentsByCreator(User creator);
}
