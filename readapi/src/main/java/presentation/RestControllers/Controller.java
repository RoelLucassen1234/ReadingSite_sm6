package presentation.RestControllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class Controller {


    @GetMapping("/hello")
    public String sayHi(){
        System.out.println("Get cocked");
        return "hi";
    }



}