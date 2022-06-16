package uj.pprochot.www.backend.ri.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Housework {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long houseworkId;

    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartmentId")
    @ToString.Exclude
    private Apartment apartment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    @ToString.Exclude
    private User executor;

    private LocalDate completionDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Housework housework = (Housework) o;
        return houseworkId != null && Objects.equals(houseworkId, housework.houseworkId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
