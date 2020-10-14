package nl.roellucassen.readroyal.api.model;

import lombok.Data;

import javax.persistence.*;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password_hash;

    private String password_salt;

    private String username;
    private String role;

}
