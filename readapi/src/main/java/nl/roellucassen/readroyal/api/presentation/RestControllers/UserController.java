package nl.roellucassen.readroyal.api.presentation.RestControllers;

import nl.roellucassen.readroyal.api.logic.Factory;
import nl.roellucassen.readroyal.api.logic.UserLogic;
import nl.roellucassen.readroyal.api.model.User;
import nl.roellucassen.readroyal.api.model.UserView;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    UserLogic logic;

    @PostMapping()
    public ResponseEntity postUser(@RequestBody UserView userView) {
        logic = Factory.getUserLogic();
        System.out.println("Posting user with email:" + userView.getPassword());
        String result = logic.postUser(userView);
        if (result.equals("OK")){
            return ResponseEntity.status(200).body(result);
        }else{
            return ResponseEntity.status(400).body(result);
        }

    }

    @GetMapping("/users/{token}")
    public ResponseEntity getUsers(@PathVariable String token) {
        logic = Factory.getUserLogic();
       List<User> users = logic.getUsers(token);
        if (users != null){
            return ResponseEntity.status(200).body(users);
        }else{
            return ResponseEntity.status(403).body("Access Denied");
        }

    }


}