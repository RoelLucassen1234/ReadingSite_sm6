package logic;

import data.UserData;
import model.User;
import model.UserView;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public class UserLogic {

    UserData userData;

    public UserLogic() {
        this.userData = new UserData();
    }

    public String postUser(UserView userView) {
        User user;
        String error = "Something went wrong";
        int iterations = 10000;
        int keyLength = 512;

        if (userView != null)
            if (userData.getUserByEmail(userView.getEmail()) == null) {
                if (userView.getPassword() != null) {
                    if (userView.getPassword().length() > 5) {
                        if (userView.getUsername() != null) {
                            if (userView.getUsername().length() > 5) {
                                String salt = RandomString.getAlphaNumericString(25);
                                char[] passwordChars = userView.getPassword().toCharArray();
                                byte[] saltBytes = RandomString.getAlphaNumericString(25).getBytes();
                                byte[] hashedBytes = hashPassword(passwordChars, saltBytes, iterations, keyLength);
                                String hashedString = Hex.encodeHexString(hashedBytes);
                                user = new User();
                                user.setRole(userView.getRole());
                                user.setEmail(userView.getEmail());
                                user.setPasswordHash(hashedString);
                                user.setUsername(userView.getUsername());
                                user.setPasswordHash(hashedString);
                                user.setPasswordSalt(salt);
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


        System.out.println(error);
        return error;


    }


    private byte[] hashPassword(final char[] password, final byte[] salt, final int iterations, final int keyLength) {

        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, keyLength);
            SecretKey key = skf.generateSecret(spec);
            byte[] res = key.getEncoded();
            return res;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
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
