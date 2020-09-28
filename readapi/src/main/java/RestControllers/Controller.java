package RestControllers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.ldap.Control;

@RestController
@RequestMapping("/test")
public class Controller {


    @GetMapping("/hello")
    public String sayHi(){
        System.out.println("Get cocked");
        return "hi";
    }



}