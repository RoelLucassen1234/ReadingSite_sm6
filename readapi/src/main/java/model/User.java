package model;

import javax.persistence.*;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;
    @Column(name = "passwordHash")
    private String passwordHash;
    @Column(name = "passwordSalt")
    private String passwordSalt;
    @Column(name = "username")
    private String username;
    @Column(name = "role")
    private String role;



    public User(){

    }


    @Column(name = "passwordHash")
    public String getPasswordHash() {
        return passwordHash;
    }

    @Column(name = "passwordHash")
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    @Column(name = "passwordSalt")
    public String getPasswordSalt() {
        return passwordSalt;
    }
    @Column(name = "passwordSalt")
    public void setPasswordSalt(String passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    @Column(name = "email")
    public void setEmail(String email) {
        this.email = email;
    }


    @Column(name = "Id")
    public Long getId() {
        return id;
    }

    @Column(name = "Id")
    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "Username")
    public String getUsername() {
        return username;
    }

    @Column(name = "Username")
    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "Rank")
    public String getRole() {
        return role;
    }

    @Column(name = "Rank")
    public void setRole(String rank) {
        this.role = rank;
    }
}
