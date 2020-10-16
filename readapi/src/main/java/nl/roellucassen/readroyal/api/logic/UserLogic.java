package nl.roellucassen.readroyal.api.logic;

import nl.roellucassen.readroyal.api.data.UserRepository;
import nl.roellucassen.readroyal.api.exception.AuthenticationException;
import nl.roellucassen.readroyal.api.exception.RoleException;
import nl.roellucassen.readroyal.api.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLogic {

    @Autowired
    private UserRepository userRepository;


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public UserLogic() {

    }


    public List<User> getUsers(String token) throws RoleException, AuthenticationException, Exception {
        logger.info("userToken: " + token + " has requested all the users");
        User user = Factory.getInstance().parse(token);

        if (!(user != null)) {
            logger.warn("Someone without the corresponding authorization is trying to pull the information of all the users. Token used: " + token);
            throw new AuthenticationException("Invalid Token");
        }

        if (!(user.getRole().equals("Admin"))) {
            logger.warn("User is trying to pull users that require administration rights");
            throw new RoleException("You do not have the right authorization to do this.");
        }

        logger.info("Userid:" + user.getId() + " has succesfully received all the users");
        return userRepository.findAll();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(Long.parseLong(id));
        logger.info("User with userId: " + id + " has succesfully been deleted");
    }


//
//
//    public User login(String email, String password) {
//        User user = userData.getUserByEmail(email);
//        String hashpw = "123";
//
//        if (user != null) {
//            if (BCrypt.checkpw(password, user.getHash())) {
//                hashpw = "12313333";
//                Random random = new Random();
//                hashpw = Integer.toString(random.nextInt(99999999 - 1000000) + 1000000);
//                System.out.println(hashpw);
//                user.setToken(hashpw);
//                return user;
//            }
//        }
//        return null;
//    }
//
//    public User getUserBySession(String session) {
//        if (session != null)
//            return userData.getUserBySession(session);
//        return null;
//    }

}
