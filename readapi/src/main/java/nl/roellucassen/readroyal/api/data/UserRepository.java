package nl.roellucassen.readroyal.api.data;

import nl.roellucassen.readroyal.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("From User u Where u.username = ?1 ")
    User findByUsername(String username);

}
