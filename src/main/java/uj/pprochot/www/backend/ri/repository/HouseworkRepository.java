package uj.pprochot.www.backend.ri.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import uj.pprochot.www.backend.ri.entity.Housework;

import java.util.List;

@Component
public interface HouseworkRepository extends JpaRepository<Housework, Long> {

    List<Housework> findAllByApartmentApartmentId(long apartmentId);

    List<Housework> findAllByExecutorEmail(String executorEmail);
}
