package nl.roellucassen.readroyal.api.logic;


import nl.roellucassen.readroyal.api.exception.JWTExpirationException;
import nl.roellucassen.readroyal.api.model.User;

public interface TokenManager {

    String issueToken(String userId, String userRole, String username);

    User parse(String token) throws Exception;
}
