package nl.roellucassen.readroyal.api.exception;

public class JWTExpirationException extends Exception {
    public JWTExpirationException(String errorMessage) {
        super(errorMessage);
    }
}
