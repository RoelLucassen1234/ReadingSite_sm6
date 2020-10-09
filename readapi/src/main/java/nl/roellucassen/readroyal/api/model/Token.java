package nl.roellucassen.readroyal.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;


@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Table(name = "token")
public class Token {


    @Id
    private String id;
    @Column(name = "token")
    private String Token;
    @Column(name = "expiresat")
    private Date expiresAt;


    public String getToken() {
        return Token;
    }

    public void setToken(String token) {
        Token = token;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
