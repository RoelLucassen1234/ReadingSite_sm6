package nl.roellucassen.readroyal.api.exception;


public class AuthenticationException extends Exception {
    public AuthenticationException(String errorMessage) {
        super(errorMessage);
    }
}
