package nl.roellucassen.readroyal.api.presentation.RestControllers;


import nl.roellucassen.readroyal.api.exception.AuthenticationException;
import nl.roellucassen.readroyal.api.exception.JWTExpirationException;
import nl.roellucassen.readroyal.api.exception.RegisterException;
import nl.roellucassen.readroyal.api.logic.AuthLogic;
import nl.roellucassen.readroyal.api.logic.Factory;
import nl.roellucassen.readroyal.api.model.JWTReturn;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.model.UserView;
import nl.roellucassen.readroyal.api.presentation.view.LoginViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;


@CrossOrigin()
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AuthLogic logic;

    @PostMapping("")
    public ResponseEntity authenticate(@RequestBody LoginViewModel loginViewModel) {

        try {
            JWTReturn token = logic.auth(loginViewModel);
            return ResponseEntity.ok(token);
        } catch (AuthenticationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", ex);
        }


    }

    @PostMapping("/user")
    public ResponseEntity postUser(@RequestBody UserView userView) {

        try {
            Long id = logic.postUser(userView);
            return ResponseEntity.created(new URI("/user/" + id)).build();

        } catch (RegisterException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", e);
        }

    }


    @GetMapping("/verify/{token}")
    public ResponseEntity verify(@PathVariable String token) {

        //TODO Return user with the token instead of a boolean
        try {
            return ResponseEntity.ok(Factory.getInstance().parse(token));
        } catch (JWTExpirationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", ex);
        }


    }
}
