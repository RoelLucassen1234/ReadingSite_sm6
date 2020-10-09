package nl.roellucassen.readroyal.api.logic;

import nl.roellucassen.readroyal.api.data.UserData;
import nl.roellucassen.readroyal.api.model.JWTReturn;
import nl.roellucassen.readroyal.api.model.User;
import org.mindrot.jbcrypt.BCrypt;
import nl.roellucassen.readroyal.api.presentation.view.LoginViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class AuthLogic {
    UserData userData;
private TokenManagerImpl tokenManager;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public AuthLogic() {
        this.userData = new UserData();
    }

    public JWTReturn auth(LoginViewModel request){

        if (request != null){
            User user = userData.getUserByUsername(request.getUsername());
            if (user != null){

               if (BCrypt.checkpw(request.getPassword(), user.getPasswordHash())){
                   logger.info("Authentication Succeeded with username: " + request.getUsername());
                   logger.info("The user " + request.getUsername() + " has entered the wrong credentials");
                   JWTReturn token = new JWTReturn();
                   //TO DO: Add rank into it
                   token.setToken(Factory.getInstance().issueToken(user.getUsername()));
                   token.setExpiresAt(Date.from(Instant.now().plus(1, ChronoUnit.DAYS)));
                   token.setRank(user.getRole());
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
