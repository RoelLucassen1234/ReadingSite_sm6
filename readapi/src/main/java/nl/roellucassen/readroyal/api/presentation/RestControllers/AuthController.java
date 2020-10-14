package nl.roellucassen.readroyal.api.presentation.RestControllers;


import nl.roellucassen.readroyal.api.logic.AuthLogic;
import nl.roellucassen.readroyal.api.logic.Factory;
import nl.roellucassen.readroyal.api.model.JWTReturn;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.presentation.view.LoginViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin()
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AuthLogic logic;

    @PostMapping("")
    public ResponseEntity authenticate(@RequestBody LoginViewModel loginViewModel) {

        JWTReturn token = logic.auth(loginViewModel);
        if (token != null) {
            System.out.println(token);
            return ResponseEntity.ok(token);
        } else
            return ResponseEntity.status(401).body("Not Authorized.");

    }


    @GetMapping("/verify/{token}")
    public ResponseEntity verify(@PathVariable String token) {
      User user = Factory.getInstance().parse(token);
        if (token != null) {
            if (user != null) {
                logger.info("Userid " + user.getId() + " succesfully verified");

                return ResponseEntity.ok(true);
            }

        }else
            logger.warn("Attempted to verify without token");

        return ResponseEntity.status(401).body(false);
    }
}
