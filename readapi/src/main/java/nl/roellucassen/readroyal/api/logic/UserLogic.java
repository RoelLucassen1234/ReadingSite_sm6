package nl.roellucassen.readroyal.api.logic;

import nl.roellucassen.readroyal.api.data.UserData;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.model.UserView;
import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserLogic {

    UserData userData;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public UserLogic() {
        this.userData = new UserData();
    }

    public String postUser(UserView userView) {
        User user;
        String error = "Something went wrong";
        if (userView != null)
            if (userData.getUserByEmail(userView.getEmail()) == null) {
                if (userView.getPassword() != null) {
                    if (userView.getPassword().length() > 5) {
                        if (userView.getUsername() != null) {
                            if (userView.getUsername().length() > 5) {

                                String gensalt = BCrypt.gensalt();
                                String pw_hash = BCrypt.hashpw(userView.getPassword() ,gensalt);
                                user = new User();
                                user.setRole(userView.getRole());
                                user.setEmail(userView.getEmail());
                                user.setUsername(userView.getUsername());
                                user.setPasswordHash(pw_hash);
                                user.setPasswordSalt(gensalt);
                                userData.addUser(user);

                                return "OK";
                            } else {
                                error = "Username is too short, should be at least 5 characters but is: " + userView.getUsername().length();
                            }
                        } else
                            error = "No username";
                    } else
                        error = "Password is too short, should be at least 5 characters but is:" + userView.getPassword().length();
                } else
                    error = "No password";
            } else
                error = "Email already in use";

        logger.info("Tried to register new user with invalid credentials. The error:" + error );
        System.out.println(error);
        return error;
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
