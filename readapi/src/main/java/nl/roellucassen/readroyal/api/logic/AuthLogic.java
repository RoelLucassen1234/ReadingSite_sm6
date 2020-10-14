package nl.roellucassen.readroyal.api.logic;

import nl.roellucassen.readroyal.api.data.UserRepository;
import nl.roellucassen.readroyal.api.model.JWTReturn;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.presentation.view.LoginViewModel;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class AuthLogic {
  //  UserData userData;
    private TokenManagerImpl tokenManager;

    @Autowired
    private UserRepository userRepository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public AuthLogic() {

    }

    public JWTReturn auth(LoginViewModel request) {

        if (request != null) {
            User user = userRepository.findByUsername(request.getUsername()).get(0);

            if (user != null) {
                if (BCrypt.checkpw(request.getPassword(), user.getPassword_hash())) {
                    logger.info("Authentication Succeeded with username: " + request.getUsername());

                    JWTReturn token = new JWTReturn();

                    token.setToken(Factory.getInstance().issueToken(user.getId().toString(), user.getRole()));
                    token.setExpiresAt(Date.from(Instant.now().plus(1, ChronoUnit.DAYS)));
                    token.setRole(user.getRole());
                    token.setUsername(user.getUsername());

                    return token;
                }
                logger.info("Authentication tried with wrong password and existing username: " + request.getUsername());
            }
            logger.info("Authentication tried with non existing username: " + request.getUsername());
        }
        logger.error("Authentication method was called with a variable of null");
        return null;
    }


}
