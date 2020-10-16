package nl.roellucassen.readroyal.api.presentation.RestControllers;


import nl.roellucassen.readroyal.api.exception.AuthenticationException;
import nl.roellucassen.readroyal.api.exception.RoleException;
import nl.roellucassen.readroyal.api.logic.UserLogic;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.presentation.view.UserDeleteView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    UserLogic logic;

    @GetMapping("/users/{token}")
    public ResponseEntity getUsers(@PathVariable String token) {

        try {
            List<User> users = logic.getUsers(token);
            return ResponseEntity.ok(users);
        } catch (RoleException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage(), ex);
        } catch (AuthenticationException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", ex);
        }


    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity deleteUser(@PathVariable String id) {

        try{
            logic.deleteUser(id);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", ex);
        }
    }

}
