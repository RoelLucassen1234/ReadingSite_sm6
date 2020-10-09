package nl.roellucassen.readroyal.api.model;

import java.util.Date;

public class JWTReturn {
    private Date expiresAt;
    private String rank;
    private String token;
    private String username;


    public JWTReturn() {
    }

    public JWTReturn(String rank, Date expiresAt, String token, String username) {
        this.rank = rank;
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

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
