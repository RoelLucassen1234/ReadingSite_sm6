package nl.roellucassen.readroyal.api.model;

import java.util.Date;

public class JWTReturn {
    private Date expiresAt;
    private String role;
    private String token;
    private String username;


    public JWTReturn() {
    }

    public JWTReturn(String rank, Date expiresAt, String token, String username) {
        this.role = rank;
        this.expiresAt = expiresAt;
        this.token = token;
        this.username = username;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
