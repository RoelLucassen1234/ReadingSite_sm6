package nl.roellucassen.readroyal.api.presentation.RestControllers;


import nl.roellucassen.readroyal.api.logic.AuthLogic;
import nl.roellucassen.readroyal.api.logic.Factory;
import nl.roellucassen.readroyal.api.model.JWTReturn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import nl.roellucassen.readroyal.api.presentation.view.LoginViewModel;


@CrossOrigin()
@RestController
@RequestMapping("/auth")
public class AuthController {
private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping("")
    public ResponseEntity authenticate(@RequestBody LoginViewModel loginViewModel) {
        AuthLogic logic = Factory.getAuthLogic();
        JWTReturn token = logic.auth(loginViewModel);
        if (token != null) {
            System.out.println(token);
            return ResponseEntity.ok(token);
        }else
            return ResponseEntity.status(401).body("Not Authorized.");

    }


    @GetMapping("/verify/{token}")
    public ResponseEntity verify(@PathVariable String token) {
      String result = Factory.getInstance().parse(token);
        if (token != null) {
      if (!result.equals("")) {
              System.out.println(token);
              return ResponseEntity.ok(true);
          }
      }
          return ResponseEntity.status(401).body(false);
    }
}
