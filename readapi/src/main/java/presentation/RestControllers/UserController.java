package presentation.RestControllers;

import logic.Factory;
import logic.UserLogic;
import model.User;
import model.UserView;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


}