package nl.roellucassen.readroyal.api.logic;


public interface TokenManager {

    String issueToken(String userId, String userRole);

    String parse(String token);
}
