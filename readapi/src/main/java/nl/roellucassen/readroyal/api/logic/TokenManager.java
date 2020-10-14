package nl.roellucassen.readroyal.api.logic;


import nl.roellucassen.readroyal.api.model.User;

public interface TokenManager {

    String issueToken(String userId, String userRole);

    User parse(String token);
}
