package nl.roellucassen.readroyal.api;

import nl.roellucassen.readroyal.api.logic.Factory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiStarter {

    public static void main(String[] args) {
        SpringApplication.run(ApiStarter.class, args);
    }

}
