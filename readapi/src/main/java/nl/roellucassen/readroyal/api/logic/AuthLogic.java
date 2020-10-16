package nl.roellucassen.readroyal.api.logic;

import nl.roellucassen.readroyal.api.data.UserRepository;
import nl.roellucassen.readroyal.api.exception.AuthenticationException;
import nl.roellucassen.readroyal.api.exception.RegisterException;
import nl.roellucassen.readroyal.api.model.JWTReturn;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.model.UserView;
import nl.roellucassen.readroyal.api.presentation.view.LoginViewModel;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthLogic {
    //  UserData userData;
    private TokenManagerImpl tokenManager;

    @Autowired
    private UserRepository userRepository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public AuthLogic() {

    }


    public Long postUser(UserView userView) throws RegisterException {
        User user;

        if (!(userRepository.findByEmail(userView.getEmail()).isEmpty())) {
            throw new RegisterException("Email already exist" + userView.getUsername().length());
        }
        validateFields(userView);

        String gensalt = BCrypt.gensalt();
        String pw_hash = BCrypt.hashpw(userView.getPassword(), gensalt);
        user = new User();
        user.setRole(userView.getRole());
        user.setEmail(userView.getEmail());
        user.setUsername(userView.getUsername());
        user.setPassword_hash(pw_hash);
        user.setPassword_salt(gensalt);
        userRepository.save(user);

        Optional<User> optionalUser = userRepository.findByEmail(userView.getEmail());
        if (optionalUser.isEmpty()) {
            throw new RegisterException("Aardappel");
        }
        return optionalUser.get().getId();


    }


    public JWTReturn auth(LoginViewModel request) throws AuthenticationException {
        validateAuthentication(request);

        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            logger.warn("Authentication tried with wrong username " + request.getUsername());
            throw new AuthenticationException("The username or password is incorrect");
        }

        User user = optionalUser.get();

        if (!(BCrypt.checkpw(request.getPassword(), user.getPassword_hash()))) {
            logger.warn("Authentication tried with wrong password and existing username: " + request.getUsername());
            throw new AuthenticationException("The username or password is incorrect");
        }
        logger.info("Authentication Succeeded with username: " + request.getUsername());
        JWTReturn token = new JWTReturn();
        token.setToken(Factory.getInstance().issueToken(user.getId().toString(), user.getRole(), user.getUsername()));
        token.setExpiresAt(Date.from(Instant.now().plus(1, ChronoUnit.DAYS)));
        token.setRole(user.getRole());
        token.setUsername(user.getUsername());

        return token;
    }

    private void validateAuthentication(LoginViewModel request) throws AuthenticationException {

        if (request == null) {
            logger.error("Authentication tried with null");
            throw new AuthenticationException("Authentication tried with non existing username and password");
        }
        Optional<User> user = userRepository.findByUsername(request.getUsername());
        if (user.isEmpty()) {
            logger.warn("Authentication tried with non existing username : " + request.getUsername());
            throw new AuthenticationException("The username or password" + request.getUsername() + " is incorrect");
        }


    }

    private void validateFields(UserView userView) throws RegisterException {
        if (!(userView.getUsername() != null)) {
            logger.warn("Authentication tried with non existing username");
            throw new RegisterException("Some fields are empty");
        }

        if (!(userView.getPassword() != null)) {
            logger.warn("Authentication tried with null password, username : " + userView.getUsername());
            throw new RegisterException("Some fields are empty");
        }

        if (!(userView.getPassword().length() > 5 || userView.getUsername().length() > 5)) {
            throw new RegisterException("TestSubject");
        }

    }


}
