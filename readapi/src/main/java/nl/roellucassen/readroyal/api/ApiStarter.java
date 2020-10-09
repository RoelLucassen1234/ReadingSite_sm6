package nl.roellucassen.readroyal.api;

import nl.roellucassen.readroyal.api.config.HibernateConfig;
import nl.roellucassen.readroyal.api.logic.Factory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class ApiStarter {

    public static void main(String[] args)  {
        HibernateConfig.setupHibernate();
        Factory.getInstance();

    SpringApplication.run(ApiStarter.class, args);

    }

}
